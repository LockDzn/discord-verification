import { Request, Response } from 'express'
import axios from 'axios'
import FormData from 'form-data'

import knex from '../database'
import config from '../config'

type UserProps = {
    id: string
    username: string
    avatar: string
    discriminator: string
    public_flags: number
    flags: number
    locale: string
}

export default class TestController {
    async index (req: Request, res: Response) {
        const code = req.query.code || undefined

        if(!code) return res.status(400).json({ message: 'Code is missing' })

        const data = new FormData();

        data.append('client_id', config.CLIENT_ID)
        data.append('client_secret', config.CLIENT_SECRET)
        data.append('grant_type', 'authorization_code')
        data.append('code', code)
        data.append('redirect_uri', config.REDIRECT_URI)
        data.append('scope', config.SCOPES)

        axios.post(`${config.DISCORD_API_BASE_URL}/oauth2/token`, data, {
            headers: {
                ...data.getHeaders(),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(async (response) => {

            const userResponse = await axios.get(`${config.DISCORD_API_BASE_URL}/users/@me`, {
                headers: { Authorization: `Bearer ${response.data.access_token}` },
            })

            const user: UserProps = userResponse.data

            const userDatabase = await knex('verify').where({ id: user.id })

            if(userDatabase.length > 0) {
                await knex('verify')
                    .where({ id: user.id })
                    .update({
                        username: user.username,
                        discriminator: user.discriminator
                    })
            } else {
                await knex('verify')
                    .insert({ 
                        id: user.id,
                        username: user.username,
                        discriminator: user.discriminator
                    })
            }
            
            res.send(`<script>window.sessionStorage.setItem('auth', 'true'); window.location.href = "/";</script>`)
        }).catch(err => {
            console.log(err.response.data)
            res.send(`<script>window.sessionStorage.setItem('auth', 'false'); window.location.href = "/";<script>`)
        })
    }
}

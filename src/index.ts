import express from 'express'
import cors from 'cors'

import bot from './bot'
import routes from './routes'

const app = express()
const port = process.env.PORT || 3333

app.use(express.json())
app.use(express.static('public'));
app.use(cors())
app.use(routes)

bot.run()

app.listen(port, () => {
    console.log(`Running in http://localhost:${port}/`)
})
import { Client, Message } from 'discord.js'
import knex from '../../database'
import config from '../../config'

module.exports = async function (client: Client, message:  Message) {

    if(message.channel.id != config.CHANNEL_VERIFY_COMMAND) return

    const msg  = message.channel.send(`<@${message.author}>, checking your information... 🔄`)

    const verify = await knex('verify').where({ id: message.author.id }).first()

    if(!verify) return (await msg).edit(`<@${message.author}>, you are not registered ❌ you need to follow the channel information <#784508913675665439>`);

    if(verify.id != message.author.id) return (await msg).edit(`<@${message.author}>, an error happened ❌`);
    
    setTimeout(async () => {
        (await msg).edit(`<@${message.author}>, checked ✅`)
        await message.member?.roles.add(config.CHECKED_ROLES)
        await knex('verify').where({ id: message.author.id }).del()
    }, 5*1000);
}
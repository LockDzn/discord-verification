import { Client, Message } from 'discord.js'

module.exports = async function (client: Client, message:  Message) {
    message.reply('pong!')
}
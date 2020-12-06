import Discord from 'discord.js'
import config  from '../config'

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Running bot: ${client.user?.username}#${client.user?.discriminator}`)
})

client.on('message', (message) => {
    if(message.channel.type == 'dm') return

    const prefix = config.BOT_PREFIX

    if(!message.content.startsWith(prefix)) return;

    const messageArray = message.content.split(" ");
    const command = messageArray[0];

    try {
        const cmd = require(`./commands/${command.slice(prefix.length)}`)
        cmd(client, message)
    } catch {
        return
    }
})

function run() {
    client.login(config.BOT_TOKEN)
}

export default { client, run }
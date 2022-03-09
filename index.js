const Discord = require('discord.js')
const client = new Discord.Client({ intents: 32767 });
const { Client, MessageEmbed } = require('discord.js')


const fs = require('fs')
let { readdirSync } = require('fs')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command )
}

client.on('ready', async () => {
  console.log("Bot encendido y listo")

})



client.on('message', async (message) => {
  let prefix = '**El prefix que tu quieras**'



  if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    message.channel.send("**Mensaje del bot**")
  }
  if(message.author.bot) return;/////////Hacemos una condicional, para que si el autor de un mensaje es un bot, no continue con el codigo////////

  if(!message.content.startsWith(prefix)) return;/////////Hacemos una condicional, para que si el mensaje no empieza con el prefijo, no continue con el codigo///////////

  let usuario = message.mentions.members.first() || message.member;/////////Definimos usuario, que seria el autor del mensaje o la primera mencion//////
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();///////////Definimos args y command que luego nos servirán/////////////



  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if (cmd) {
    try {
      cmd.execute(client, message, args)
    } catch (err) {
      message.channel.send("Se ha producido un error por favor contactate con el developer del bot para solucionarlo.")
    }
  }

  if(!cmd){
    message.channel.send(`El comando ${command} no existe.`)
  }

})

client.login("**El token de tu bot**")

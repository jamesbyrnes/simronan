require('dotenv').config();

const Discord = require('discord.js');
const dclient = new Discord.Client();

const { messageHandler } = require('./handlers/messageHandler');

dclient.on('ready', () => {
  console.log(`Logged in as ${dclient.user.tag}!`);
});

dclient.on('message', (msg) => {
  messageHandler(dclient, msg);
});

dclient.login(process.env.DISCORD_CLIENT_TOKEN);

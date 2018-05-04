const Discord = require('discord.js');
const dclient = new Discord.Client();
const settings = require('./settings');
const mainSettings = settings.getSettings();

const { messageHandler } = require('./handlers/messageHandler');

dclient.on('ready', () => {
  console.log(`Logged in as ${dclient.user.tag}!`);
});

dclient.on('message', (msg) => {
  messageHandler(dclient, msg);
});

dclient.login(mainSettings.discordToken);

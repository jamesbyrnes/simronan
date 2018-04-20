require('dotenv').config();

const Discord = require('discord.js');
const dclient = new Discord.Client();

const { getRandomLyric } = require('./models/lyrics');

dclient.on('ready', () => {
  console.log(`Logged in as ${dclient.user.tag}!`);
});

dclient.on('message', (msg) => {
  if (msg.author.id === dclient.user.id) return;

  if (msg.content === '<:ronan:422580945250549766> x') {
    getRandomLyric()
    .then((lyrics) => {
      msg.reply(lyrics);
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (msg.content.indexOf('⚔') >= 0) {
    msg.reply("SWOOOOORDS");
  }
});

dclient.login(process.env.DISCORD_CLIENT_TOKEN);

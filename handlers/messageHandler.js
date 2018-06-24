const settings = require('../settings');
const { getRandomLyric, getAllLyrics } = require('../models/lyrics');
const Markov = require('../models/markov');

module.exports.messageHandler = (dclient, msg) => {
  const mainSettings = settings.getSettings();
  const responseTable = settings.getInverseResponseTable(); 

  if (msg.author.id === dclient.user.id) return;
  if (Object.keys(responseTable).indexOf(msg.content) < 0) return;
  if (mainSettings.channels.length > 0) {
    if (mainSettings.channels.indexOf(msg.channel.name) < 0) return;
  }

  const trigger = responseTable[msg.content];

  if (trigger === "LYRIC_RANDOM") {
    getRandomLyric()
    .then((lyrics) => {
      msg.reply(lyrics);
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (trigger === "LYRIC_MARKOV") {
    getAllLyrics()
    .then((lyricsArray) => {
      markovChain = new Markov(lyricsArray);
      msg.reply(markovChain.getChain());
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (trigger === "BANTER_SWORDS") {
    msg.reply("SWOOOOOOORDS");
  } 
};
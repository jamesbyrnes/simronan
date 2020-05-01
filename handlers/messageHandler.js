const { getRandomLyric, getAllLyrics } = require('../models/lyrics');
const Markov = require('../models/markov');

module.exports.messageHandler = (dclient, msg) => {
  if (msg.author.id === dclient.user.id) return;

  const trigger = msg.content;

  if (trigger === "<:ronan:422580945250549766>") {
    getRandomLyric()
    .then((lyrics) => {
      msg.reply(lyrics);
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (trigger === "<:notafraid:422937125370069002>") {
    getAllLyrics()
    .then((lyricsArray) => {
      markovChain = new Markov(lyricsArray);
      msg.reply(markovChain.getChain());
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (trigger.includes("swords")) {
    msg.reply("SWOOOOOOORDS!");
  } 
};
const settings = require('../settings');
const { getRandomLyric } = require('../models/lyrics');

module.exports.messageHandler = (dclient, msg) => {
  const mainSettings = settings.getSettings();
  const responseTable = settings.getInverseResponseTable(); 

  if (msg.author.id === dclient.user.id) return;
  if (Object.keys(responseTable).indexOf(msg.content) < 0) return;
  if (mainSettings.buildVersion === "dev") {
    if (mainSettings.devChannels !== [] && mainSettings.devChannels.indexOf(msg.channel.name) < 0) return;
  } else {
    if (mainSettings.prodChannels !== [] && mainSettings.prodChannels.indexOf(msg.channel.name) < 0) return;
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
  } else if (trigger === "BANTER_SWORDS") {
    msg.reply("SWOOOOOOORDS");
  }
};
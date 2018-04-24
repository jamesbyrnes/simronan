const settingsMap = require('./settings.json');

module.exports.getSettings = () => {
  return settingsMap;
};

module.exports.getInverseResponseTable = () => {
  const responseTable = settingsMap.responseTable;
  return Object.keys(responseTable).reduce((obj, key) => {
    responseTable[key].map((trigger) => {
      obj[trigger] = key;
    });
    return obj;
  }, {});
};
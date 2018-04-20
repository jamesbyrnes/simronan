const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/lyrics.db');

module.exports.getRandomLyric = () => {
  const QUERY_LYRIC_RANDOM = `SELECT * FROM lyrics ORDER BY RANDOM() LIMIT 1;`

  return new Promise ((resolve, reject) => {
    db.get(QUERY_LYRIC_RANDOM, (err, row) => {
      if (err) reject(err);
      let lyricArr = row["lyrics"].split('\n');
      let res = [];
      let firstLine = Math.floor(Math.random() * (lyricArr.length - 3));
      let lyricLength = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < lyricLength; i++) {
        res.push(lyricArr[firstLine + i]);
      }
      resolve(res.join('\n'));
    });
  });
};

const MarkovChain = require('markovchain');

const MIN_WORDS_PER_LYRIC = 15;
const MAX_WORDS_PER_LYRIC = 20;

function normalizeArray(lyricsArray) {
  return lyricsArray.map((lyrics) => {
    return lyrics
      .toLowerCase()
      .replace(/((^|\n)[a-z])/g, (char) => char.toUpperCase())
      .replace(/[,"!?\-();:]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }).join(' ');
}

function useUpperCase(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z'
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

function formatMarkov(markovString) {
  return markovString
    .replace(/([A-Z])/g, '\n$1')
    .replace(/(i)[' $]/g, (char) => char.toUpperCase());
}

function Markov(lyricsArray) {
  const lyricsFormatted = normalizeArray(lyricsArray);

  this.generator = new MarkovChain(lyricsFormatted);
}

Markov.prototype.getChain = function getChain() {
  var lyricLength = Math.floor(Math.random() * MAX_WORDS_PER_LYRIC) + MIN_WORDS_PER_LYRIC;

  var newLyrics = this.generator
    .start(useUpperCase)
    .end(lyricLength)
    .process();

  return formatMarkov(newLyrics);
}

module.exports = Markov;
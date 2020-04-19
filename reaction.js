const generate = require('openmoji-spritemap-generator')
const emojis = require('openmoji/data/openmoji.json')

const gestures = emojis
    .filter((emoji) => emoji.group === 'people-body')
    .filter((emoji) => emoji.subgroups === 'hand-single-finger')
    .filter((emoji) => !emoji.hexcode.includes('-'))

const sports = emojis
  .filter((emoji) => emoji.group === 'activities')
  .filter((emoji) => emoji.subgroups === 'sport')

const smileys = emojis.filter((emoji) => emoji.group === 'smileys-emotion')

generate({
  emojis: gestures.concat(sports).concat(smileys),
  emojiDir: 'assets/openmoji-72x72-color',
  emojiSize: 64,
  name: 'smileys',
  targetImagePath: 'dist/emojis.png',
}, (err) => {
  if (err) {
    throw err
  }
  console.log('Emojis generated')
})

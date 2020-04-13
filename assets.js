const { load } = require('kontra')

const assets = [
  '/assets/Tilesheet/groundGravel.png',
  '/assets/Spritesheet/sheet_characters.png'
]

function loadAssets () {
  return load(...assets)
}

module.exports = loadAssets

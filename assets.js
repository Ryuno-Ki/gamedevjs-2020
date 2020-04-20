const assets = [
  './assets/Tilesheet/elements.png',
  './assets/Tilesheet/groundGravel.png',
  './assets/Spritesheet/sheet_characters.png',
  './assets/Spritesheet/sheet_charactersEquipment.png'
]

function loadAssets () {
  return window.kontra.load(...assets)
}

module.exports = loadAssets

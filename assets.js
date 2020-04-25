function loadAssets (gameMode) {
  const modeMap = {
    'single': [
      './assets/Tilesheet/elements.png',
      './assets/Tilesheet/groundGravel.png',
      './assets/Spritesheet/sheet_characters.png',
      './assets/Spritesheet/sheet_charactersEquipment.png'
    ],
    'initiator': [
      './assets/Tilesheet/elements.png',
      './assets/Tilesheet/groundGravel.png',
      './assets/Spritesheet/sheet_characters.png',
      './assets/Spritesheet/sheet_charactersEquipment.png',
      './assets/crowd.mp3',
      './assets/dribbling.mp3',
      './assets/throw.mp3',
      './assets/whistle.mp3'
    ],
    'joiner': [
      './assets/Tilesheet/elements.png',
      './assets/Tilesheet/groundGravel.png',
      './assets/Spritesheet/sheet_characters.png',
      './assets/Spritesheet/sheet_charactersEquipment.png',
      './assets/crowd.mp3',
      './assets/dribbling.mp3',
      './assets/throw.mp3',
      './assets/whistle.mp3'
    ],
    'visitor': [
      './assets/Tilesheet/elements.png',
      './assets/Tilesheet/groundGravel.png',
      './assets/Spritesheet/sheet_characters.png',
      './assets/Spritesheet/sheet_charactersEquipment.png',
      './emojis.png'
    ]
  }

  return window.kontra.load(...modeMap[ gameMode ])
}

module.exports = loadAssets

const modeMap = require('./assets-to-load.json')

function loadAssets (gameMode) {
  return window.kontra.load(...modeMap[ gameMode ])
}

module.exports = loadAssets

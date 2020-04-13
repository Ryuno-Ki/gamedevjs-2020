const { load } = require('kontra')

const assets = [
  '/assets/Tilesheet/groundGravel.png'
]

function loadAssets () {
  return load(...assets)
}

module.exports = loadAssets

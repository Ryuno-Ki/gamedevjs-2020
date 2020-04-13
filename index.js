const { GameLoop, init } = require('kontra')

const loadAssets = require('./assets')
const renderGround = require('./scenes/game.scene')

window.onload = async () => {
  'use strict'
  init()

  const assets = await loadAssets()
  const tileEngine = renderGround(assets[0])
  let loop = GameLoop({
    update: () => {
    },
    render: () => {
      tileEngine.render()
    }
  })
  loop.start()
}

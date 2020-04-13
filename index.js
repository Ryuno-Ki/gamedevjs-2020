const { GameLoop, init } = require('kontra')

const loadAssets = require('./assets')
const renderGround = require('./scenes/game.scene')
const renderPlayer = require('./sprites/player')

window.onload = async () => {
  'use strict'
  init()

  const assets = await loadAssets()
  const tileEngine = renderGround(assets[0])
  const player = renderPlayer(assets[1])

  tileEngine.addObject(player)

  let loop = GameLoop({
    update: () => {
    },
    render: () => {
      tileEngine.render()
      player.render()
    }
  })
  loop.start()
}

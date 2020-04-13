const { GameLoop, init, initKeys, keyPressed } = require('kontra')

const loadAssets = require('./assets')
const renderGround = require('./scenes/game.scene')
const renderPlayer = require('./sprites/player')

window.onload = async () => {
  'use strict'
  const { canvas } = init()
  initKeys()

  const assets = await loadAssets()
  const tileEngine = renderGround(assets[0])
  const player = renderPlayer(assets[1], 1)
  const opponent = renderPlayer(assets[1], 2)

  tileEngine.addObject(player)
  tileEngine.addObject(opponent)

  let loop = GameLoop({
    update: () => {
      movePlayer(player)
      moveOpponent(opponent)
    },
    render: () => {
      tileEngine.render()
      player.render()
      opponent.render()
    }
  })
  loop.start()

  function movePlayer (player) {
    if (keyPressed('left') && player.x >= 8) {
      player.flipped = true
      player.turned = 0
      player.x -= 8
    }

    if (keyPressed('right') && player.x <= (canvas.width - 21 - 8)) {
      player.flipped = false
      player.turned = 0
      player.x += 8
    }

    if (keyPressed('up') && player.y >= 8) {
      player.turned = -1
      player.y -= 8
    }

    if (keyPressed('down') && player.y <= (canvas.height - 31 - 8)) {
      player.turned = 1
      player.y += 8
    }
    player.update()
  }

  function moveOpponent (opponent) {
    if (keyPressed('a') && opponent.x >= 8) {
      opponent.flipped = true
      opponent.turned = 0
      opponent.x -= 8
    }

    if (keyPressed('d') && opponent.x <= (canvas.width - 21 - 8)) {
      opponent.flipped = false
      opponent.turned = 0
      opponent.x += 8
    }

    if (keyPressed('w') && opponent.y >= 8) {
      opponent.turned = -1
      opponent.y -= 8
    }

    if (keyPressed('s') && opponent.y <= (canvas.height - 31 - 8)) {
      opponent.turned = 1
      opponent.y += 8
    }
    opponent.update()
  }
}

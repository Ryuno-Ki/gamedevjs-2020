const { GameLoop, init, initKeys, keyPressed } = require('kontra')

const loadAssets = require('./assets')
const renderGround = require('./scenes/game.scene')
const renderBall = require('./sprites/ball')
const renderPlayer = require('./sprites/player')
const renderScore = require('./sprites/score')

window.onload = async () => {
  'use strict'
  const { canvas } = init()
  initKeys()

  const assets = await loadAssets()
  const tileEngine = renderGround(assets[0])
  const player = renderPlayer(assets[1], 1)
  const opponent = renderPlayer(assets[1], 2)
  const ball = renderBall(assets[2])
  const playerScore = renderScore(assets[0], true)
  const opponentScore = renderScore(assets[0], false)

  tileEngine.addObject(player)
  tileEngine.addObject(opponent)
  tileEngine.addObject(ball)
  tileEngine.addObject(playerScore)
  tileEngine.addObject(opponentScore)

  let loop = GameLoop({
    update: () => {
      movePlayer(player)
      moveOpponent(opponent)
      moveBall({ player, opponent, ball, playerScore, opponentScore })
    },
    render: () => {
      tileEngine.render()
      playerScore.render()
      opponentScore.render()
      player.render()
      opponent.render()
      ball.render()
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

  function moveBall ({ player, opponent, ball, playerScore, opponentScore }) {
    const dpx = player.x - ball.x
    const dpy = player.y - ball.y
    const dox = opponent.x - ball.x
    const doy = opponent.y - ball.y

    const ddp = dpx * dpx + dpy * dpy
    const ddo = dox * dox + doy * doy

    if (ddp < ddo) {
      ball.x = ball.x + dpx / 2
      ball.y = ball.y + dpy / 2
    }

    if (ddo < ddp) {
      ball.x = ball.x + dox / 2
      ball.y = ball.y + doy / 2
    }

    if (ball.x >= 0 && ball.x <= 64 && ball.y >= 3 * 64 && ball.y <= 4 * 64) {
      updateScore(playerScore, 'score1')
    }

    ball.update()
  }

  function updateScore (score, animation) {
    score.playAnimation(animation)
  }
}

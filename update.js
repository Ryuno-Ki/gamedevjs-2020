const { emit, keyPressed } = require('kontra')

function update ({
  canvas,
  tileEngine,
  player,
  opponent,
  ball,
  playerBasket,
  opponentBasket,
  playerScore,
  opponentScore
}) {
  movePlayer({ player, canvas, tileEngine })
  moveOpponent(opponent, canvas)
  moveBall({
    player,
    opponent,
    ball,
    playerBasket,
    opponentBasket,
    playerScore,
    opponentScore,
  })
}

function movePlayer ({ player, canvas, tileEngine }) {
  if (keyPressed('left') && player.x >= 8) {
    player.flipped = true
    player.turned = 0
    player.x -= 8
    emit(
      'userInteraction',
      { player: 'player', direction: 'left', dx: -8, dy: 0 }
    )
  }

  if (keyPressed('right') && player.x <= (canvas.width - 21 - 8)) {
    player.flipped = false
    player.turned = 0
    player.x += 8
    emit(
      'userInteraction',
      { player: 'player', direction: 'right', dx: 8, dy: 0 }
    )
  }

  if (keyPressed('up') && player.y >= 8) {
    player.turned = -1
    player.y -= 8
    emit(
      'userInteraction',
      { player: 'player', direction: 'up', dx: 0, dy: -8 }
    )
  }

  if (keyPressed('down') && player.y <= (canvas.height - 31 - 8)) {
    player.turned = 1
    player.y += 8
    emit(
      'userInteraction',
      { player: 'player', direction: 'down', dx: 0, dy: 8 }
    )
  }

  tileEngine.sx = player.x
  tileEngine.sy = player.y
  player.update()
}

function moveOpponent (opponent, canvas) {
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

function moveBall ({
  player,
  opponent,
  ball,
  playerBasket,
  opponentBasket,
  playerScore,
  opponentScore
}) {
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

  if (playerBasket.collidesWith(ball) && opponent.collidesWith(ball)) {
    updateScore(opponentScore, 'score1')
  }

  if (opponentBasket.collidesWith(ball) && player.collidesWith(ball)) {
    updateScore(playerScore, 'score1')
  }

  ball.update()
}

function updateScore (score, animation) {
  score.playAnimation(animation)
}

module.exports = update

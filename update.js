function update ({
  canvas,
  tileEngine,
  player,
  opponent,
  ball,
  playerBasket,
  opponentBasket,
  playerScore,
  opponentScore,
  playerName,
  dribblingSound,
  throwSound, whistleSound
}) {
  movePlayer({ player, canvas, tileEngine, playerName })
  moveOpponent({ opponent, canvas })
  moveBall({
    player,
    opponent,
    ball,
    playerBasket,
    opponentBasket,
    playerScore,
    opponentScore,
    dribblingSound,
    throwSound,
    whistleSound
  })

  window.kontra.on('score', () => {
    ball.x = 17 + 5 * 64
    ball.y = 16 + 4 * 64
    player.x = 32 + 21 + (3 + 1) * 64
    player.y = 16 + 4 * 64
    opponent.x = 32 + 21 + (3 + 2) * 64
    opponent.y = 16 + 4 * 64
  })
}

function movePlayer ({
  player,
  canvas,
  tileEngine,
  playerName,
}) {
  const emit = window.kontra.emit
  const keyPressed = window.kontra.keyPressed

  const dx = 8
  const dy = 8
  const upperFieldBoundary = 1 * 64
  const lowerFieldBoundary = 8 * 64

  if (keyPressed('left') && player.x >= dx) {
    player.flipped = true
    player.turned = 0
    player.x -= dx
    tileEngine.sx -= dx
    emit(
      'userInteraction',
      { player: playerName, direction: 'left', dx: -dx, dy: 0 }
    )
  }

  if (keyPressed('right') && player.x <= (canvas.width - 21 - dx)) {
    player.flipped = false
    player.turned = 0
    player.x += dx
    tileEngine.sx += dx
    emit(
      'userInteraction',
      { player: playerName, direction: 'right', dx: dx, dy: 0 }
    )
  }

  if (keyPressed('up') && player.y >= upperFieldBoundary + dy) {
    player.turned = -1
    player.y -= dy
    tileEngine.sy -= dy
    emit(
      'userInteraction',
      { player: playerName, direction: 'up', dx: 0, dy: -dy }
    )
  }

  if (keyPressed('down') && player.y <= (lowerFieldBoundary - 31 - dy)) {
    player.turned = 1
    player.y += dy
    tileEngine.sy += dy
    emit(
      'userInteraction',
      { player: playerName, direction: 'down', dx: 0, dy: dy }
    )
  }

  player.update()
}

function moveOpponent ({ opponent, canvas }) {
  const keyPressed = window.kontra.keyPressed

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
  opponentScore,
  dribblingSound,
  throwSound,
  whistleSound
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
    const currentScore = window.kontra.getStoreItem('score')
    const newScore = currentScore.opponent - 0 + 1
    updateScore(opponentScore, `score${newScore}`, throwSound, whistleSound)
    window.kontra.setStoreItem('score', {
      ...currentScore,
      'opponent': newScore
    })
  }

  if (opponentBasket.collidesWith(ball) && player.collidesWith(ball)) {
    const currentScore = window.kontra.getStoreItem('score')
    const newScore = currentScore.player - 0 + 1
    updateScore(playerScore, `score${newScore}`, throwSound, whistleSound)
    window.kontra.setStoreItem('score', {
      ...currentScore,
      'player': newScore
    })
  }

  if (dribblingSound) {
    dribblingSound.play()
  }
  ball.update()
}

function updateScore (score, animation, throwSound, whistleSound) {
  score.playAnimation(animation)
  if (throwSound) {
    throwSound.play()
  }
  window.kontra.emit('score')
  if (whistleSound) {
    whistleSound.play()
  }
}

module.exports = update

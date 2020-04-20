function renderBall(ball) {
  const sheet = window.kontra.SpriteSheet({
    frameWidth: 17,
    frameHeight: 17,
    frameMargin: 2,
    image: ball,
    animations: {
      stand: {
        frames: [ 47.7 ]
      }
    }
  })

  const sprite = window.kontra.Sprite({
    x: 17 + 5 * 64,
    y: 16 + 4 * 64,
    animations: sheet.animations
  })

  return sprite
}

module.exports = renderBall

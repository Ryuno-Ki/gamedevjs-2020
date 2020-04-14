const { Sprite, SpriteSheet } = require('kontra')

function renderBasket (image, isForPlayer) {
  const sheet = SpriteSheet({
    frameWidth: 64,
    frameHeight: 64,
    image,
    animations: {
      stand: {
        frames: isForPlayer ? 63 : 64
      }
    }
  })

  const sprite = Sprite({
    x: isForPlayer ? 8 : 10 * 64 - 8,
    y: 4 * 64,
    animations: sheet.animations
  })

  return sprite
}

module.exports = renderBasket

const { Sprite, SpriteSheet } = require('kontra')

function renderPlayer (image) {
  const body = SpriteSheet({
    frameWidth: 21,
    frameHeight: 31,
    image,
    animations: {
      stand: {
        frames: 1
      }
    }
  })

  const sprite = Sprite({
    x: 5 * 64,
    y: 16 + 3 * 64,
    animations: body.animations
  })

  return sprite
}

module.exports = renderPlayer

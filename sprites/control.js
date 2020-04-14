const { pointerPressed, Sprite, SpriteSheet } = require('kontra')

const resolution = {
  canvasWidth: 706,
  canvasHeight: 572,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight
}

function renderControl (image) {
  const sheet = SpriteSheet({
    frameWidth: 64,
    frameHeight: 64,
    image,
    animations: {
      stand: {
        frames: 53
      }
    }
  })

  const sprite = Sprite({
    x: 1 * 64,
    y: 8 * 64,
    animations: sheet.animations,
    collidesWithPointer: function (pointer) {
      const { x, y } = pointer
      const rescaledX = x * resolution.canvasWidth / resolution.windowWidth / 0.95
      const rescaledY = y * resolution.canvasHeight / resolution.windowHeight / 0.95
      const withinWidth = rescaledX >= this.x && rescaledX <= this.x + this.width
      const withinHeight = rescaledY >= this.y && rescaledY <= this.y + this.height
      return withinWidth && withinHeight
    }
  })

  return sprite
}

module.exports = renderControl

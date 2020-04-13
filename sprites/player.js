const { Sprite, SpriteSheet } = require('kontra')

function renderPlayer (image, frame) {
  const body = SpriteSheet({
    frameWidth: 21,
    frameHeight: 31,
    image,
    animations: {
      stand: {
        frames: frame,
	loop: false
      }
    }
  })

  const sprite = Sprite({
    x: 32 + 21 + (3 + frame) * 64,
    y: 16 + 3 * 64,
    animations: body.animations,
    flipped: false,
    turned: 0,
    render: function () {
      this.context.save()
      this.draw()

      if (this.flipped) {
	// Kudos: https://stackoverflow.com/a/3129152
	/*
        const image = this.currentAnimation.spriteSheet.image
	this.context.translate(this.x, this.y)
	this.context.scale(-1, 1)
	console.log('Spritesheet', this.currentAnimation)
        console.log('Flip', ...unpackDrawData(this))
	this.context.drawImage(...unpackDrawData(this))
	*/
	console.log('TODO: IMPLEMENT FLIPPING')
      }

      if (this.turned === -1) {
	/*
        this.context.translate(this.x, this.y)
	this.context.rotate(degreesToRadians(90))
	this.context.drawImage(...unpackDrawData(this))
	*/
	console.log('TODO: IMPLEMENT TURNING UPWARDS')
      }
      
      if (this.turned === 1) {
	/*
        this.context.translate(this.x, this.y)
	this.context.rotate(degreesToRadians(-90))
	this.context.drawImage(...unpackDrawData(this))
	*/
	console.log('TODO: IMPLEMENT TURNING DOWNWARDS')
      }

      this.context.restore()
    }
  })

  return sprite
}

function unpackDrawData (sprite) {
  const image = sprite.currentAnimation.spriteSheet.image
  const frame = sprite.currentAnimation.frames[0]
  const x = sprite.x
  const y = sprite.y
  const width = sprite.width
  const height = sprite.height
  const sx = frame * width
  const sy = 0
  const sWidth = width
  const sHeight = height

  return [
    image,
    sx,
    sy,
    sWidth,
    sHeight,
    x,
    y,
    width,
    height
  ]
}

function degreesToRadians (degrees) {
  return degrees * Math.PI / 180
}

module.exports = renderPlayer

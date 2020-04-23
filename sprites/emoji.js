function renderEmoji (image, name, visitorName) {
  const animationsMap = {
    'left': 0,
    'right': 1,
    'up': 2,
    'down': 4,
    'ball': 9,
    'goal': 24
  }

  const nameMap = {
    left: 0,
    right: 1,
    up: 2,
    down: 3,
    ball: 4,
    goal: 5
  }

  const sheet = window.kontra.SpriteSheet({
    frameWidth: 64,
    frameHeight: 64,
    image,
    animations: {
      [ name ]: {
        frames: animationsMap[ name ]
      }
    }
  })

  const sprite = window.kontra.Sprite({
    x: nameMap[ name ] * 64,
    y: 8 * 64,
    animations: sheet.animations,
    onUp: function () {
      window.kontra.emit('Visitor', { emoji: name, visitor: visitorName })
    }
  })

  return sprite
}

module.exports = renderEmoji

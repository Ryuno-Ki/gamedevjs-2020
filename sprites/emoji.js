function renderEmoji (image, name) {
  const animationsMap = {
    'left': 0,
    'right': 1,
    'up': 2,
    'down': 4,
    'ball': 9,
    'goal': 24
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

  const nameMap = {
    left: 0,
    right: 1,
    up: 2,
    down: 3,
    ball: 4,
    goal: 5
  }

  const sprite = window.kontra.Sprite({
    x: nameMap[ name ] * 64,
    y: 8 * 64,
    animations: sheet.animations
  })

  return sprite
}

module.exports = renderEmoji

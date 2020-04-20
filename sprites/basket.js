function renderBasket (image, isForPlayer) {
  const sheet = window.kontra.SpriteSheet({
    frameWidth: 64,
    frameHeight: 64,
    image,
    animations: {
      stand: {
        frames: isForPlayer ? 63 : 64
      }
    }
  })

  const sprite = window.kontra.Sprite({
    x: isForPlayer ? 8 : 10 * 64 - 8,
    y: 4 * 64,
    animations: sheet.animations
  })

  return sprite
}

module.exports = renderBasket

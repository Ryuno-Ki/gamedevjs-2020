function renderScore (image, player) {
  const sheet = window.kontra.SpriteSheet({
    frameWidth: 64,
    frameHeight: 64,
    image,
    animations: {
      score0: {
        frames: 195,
        loop: false
      },
      score1: {
        frames: 196,
	loop: false
      },
      score2: {
        frames: 197,
	loop: false
      },
      score3: {
        frames: 198,
	loop: false
      },
      score4: {
        frames: 199,
	loop: false
      },
      score5: {
        frames: 200,
	loop: false
      },
      score6: {
        frames: 201,
	loop: false
      },
      score7: {
        frames: 202,
	loop: false
      },
      score8: {
        frames: 203,
	loop: false
      },
      score9: {
        frames: 204,
	loop: false
      }
    }
  })

  const sprite = window.kontra.Sprite({
    x: player ? 4 * 64 : 6 * 64,
    y: 0,
    animations: sheet.animations
  })

  return sprite
}

module.exports = renderScore

function handleBackgroundMusic (crowdSound) {
  // Kudos: https://stackoverflow.com/a/22446616
  // and https://stackoverflow.com/a/32841351
  crowdSound.addEventListener('timeupdate', function () {
    const playback = this.currentTime / this.duration
    if (playback < 0.5) {
      this.volume = 2 * playback
    } else if (playback > 0.5) {
      this.volume = 2 - 2 * playback
    } else {
      this.volume = 1
    }
  })
  crowdSound.loop = true
  crowdSound.play()

  window.kontra.on('backgroundMusic:toggle', (newState) => {
    if (newState) {
      crowdSound.play()
    } else {
      crowdSound.pause()
    }
  })
}

module.exports = handleBackgroundMusic

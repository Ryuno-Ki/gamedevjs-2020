function handleBackgroundSound ({ dribblingSound, throwSound, whistleSound }) {
  // Kudos: https://stackoverflow.com/a/22446616
  // and https://stackoverflow.com/a/32841351
  window.kontra.on('backgroundSound:toggle', (newState) => {
    if (newState) {
      dribblingSound.play()
      throwSound.play()
      whistleSound.play()
    } else {
      dribblingSound.pause()
      throwSound.pause()
      whistleSound.pause()
    }
  })
}

module.exports = handleBackgroundSound

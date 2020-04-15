function invitePeer (parent) {
  const peer = new SimplePeer({
    initiator: location.hash === '#1',
    trickle: false
  })

  peer.on('error', (error) => console.error('error', error))

  peer.on('signal', async (data) => {
    const picture = await signalToPicture(data)
    const canvas = appendPicture(parent, picture)
    canvasToSignal(canvas)
    console.log(JSON.stringify(data))
  })

  peer.on('connect', () => {
    console.log('CONNECT')
    peer.send('Whatever ' + Math.random())
  })

  peer.on('data', (data) => console.log('data ' + data))
}

function appendPicture (parent, picture) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const p = document.createElement('p')
  const text = document.createTextNode('Please send your friend this picture to join')
  console.log(picture)
  canvas.width = picture.width
  canvas.height = picture.height
  context.drawImage(picture, 0, 0)

  p.appendChild(text)
  parent.appendChild(p)
  parent.appendChild(canvas)
  return canvas
}

async function signalToPicture (signal) {
  const gapValue = 0
  const base64Signal = btoa(signal)
  const decSignal = base64Signal.split('').map(charToDec)

  // XXX: This is a waste of RAM!
  // But I couldn't come up with a more clever algorithm for now
  let preparedArray = []
  for (let i = 0; i < decSignal.length; i += 3) {
    preparedArray = preparedArray
      .concat(decSignal.slice(i, i+3))
      .concat([ gapValue ])
  }

  // Fill up with gapValues until it can be divided by 64
  const power = Math.ceil(Math.log(preparedArray.length) / Math.log(64))
  preparedArray = preparedArray
    .concat(new Array(Math.pow(64, power) - preparedArray.length).fill(gapValue))

  const clamped = new Uint8ClampedArray(preparedArray)
  const imageData = new ImageData(clamped, clamped.length / 4 / 16)
  console.log(clamped, imageData)
  return createImageBitmap(imageData, { colorSpaceConversion: 'none' })
}

function canvasToSignal (canvas) {
  const width = 32
  const height = 16
  const context = canvas.getContext('2d')
  const imageData = context.getImageData(0, 0, width, height)
  console.table(imageData.data)
}

function decToChar (dec) {
  return String.fromCharCode(dec)
}

function charToDec (char) {
  return char.charCodeAt(0)
}

module.exports = invitePeer

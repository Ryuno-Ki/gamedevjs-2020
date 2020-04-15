function invitePeer (parent) {
  const peer = new SimplePeer({
    initiator: location.hash === '#1',
    trickle: false
  })

  peer.on('error', (error) => console.error('error', error))
  peer.on('signal', (data) => {
    console.log('SIGNAL', JSON.stringify(data))
    const mnemonic = signalToMnemonic(JSON.stringify(data))
    const signal = mnemonicToSignal(mnemonic)
    console.log(signal)
    console.log(mnemonic)
  })
  peer.on('connect', () => {
    console.log('CONNECT')
    peer.send('Whatever ' + Math.random())
  })
  peer.on('data', (data) => {
    console.log('data ' + data)
  })
}

function signalToMnemonic (signal) {
  const size = 32
  const mnemonics = []
  const base64Signal = btoa(signal)
  const power = Math.ceil(Math.log2(base64Signal.length))
  // bip39 expects multiples of 16, so padd with # up to the next power of 2
  const paddedSignal = base64Signal + '#'.repeat(
    Math.pow(2, power) - base64Signal.length
  )

  const signalAsHex = paddedSignal
    .split('')
    .map(charToDec)
    .map(decToHex)
    .join('')

  for (let i = 0; i < signalAsHex.length / size; i++) {
    const part = signalAsHex.slice(i * size, (i+1) * size)
    const mnemonic = bip39.entropyToMnemonic(part)
    mnemonics.push(mnemonic)
  }

  console.log('Encoded words:', signalAsHex.length, signalAsHex)
  return mnemonics.join(' ')
}

function mnemonicToSignal (mnemonic) {
  const size = 12
  const words = mnemonic.split(' ')
  const power = words.length / size
  let entropies = []

  for (let i = 0; i < power; i++) {
    const phrase = words.slice(i*size, (i+1)*size).join(' ')
    const entropy = bip39.mnemonicToEntropy(phrase)
    entropies.push(entropy)
  }
  entropies = entropies.join('')

  console.log('Decoded words:', entropies.length, entropies)
  const parts = entropies
    .split('')
    .map(hexToDec)
    .map(decToChar)
    .join('')

  return btoa(parts)
}

function wordToChars (word) {
  const chars = []
  for (let i = 0; i < word.length; i += 2) {
    const char = word.slice(i * 2, (i+1) * 2)
    chars.push(char)
  }
  return chars
}

function hexToDec (hex) {
  console.log(`${hex} => ${parseInt(hex, 16).toString(10)}`)
  return parseInt(hex, 16).toString(10)
}

function decToHex (dec) {
  console.log(`${dec} => ${dec.toString(16).padStart(4, '0')}`)
  return dec.toString(16).padStart(4, '0')
}

function decToChar (dec) {
  console.log(`${dec} => ${String.fromCharCode(dec)}`)
  return String.fromCharCode(dec)
}

function charToDec (char) {
  return char.charCodeAt(0)
}

module.exports = invitePeer

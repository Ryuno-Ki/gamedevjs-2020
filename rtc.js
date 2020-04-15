function invitePeer (parent) {
  const textarea = document.createElement('textarea')
  parent.appendChild(textarea)

  const peer = new SimplePeer({
    initiator: location.hash === '#1'
  })

  if (!peer.initiator) {
    const read = document.createElement('button')
    read.type = 'button'
    read.textContent = 'Join the party!'
    read.addEventListener('click', () => {
      console.log('Offer', textarea, textarea.value)
      peer.signal(JSON.parse(textarea.value))
    })
    parent.appendChild(read)
  }

  peer.on('error', (error) => console.error('error', error))

  peer.on('signal', async (data) => {
    console.log('Signal received', new Date(), data)
    textarea.textContent = JSON.stringify(data)

    if (data.type === 'offer') {
      const p = document.createElement('p')
      const text = document.createTextNode('Please send your friend this text to join')
      p.appendChild(text)
      parent.insertBefore(p, textarea)
    }
  })

  peer.on('connect', () => {
    console.log('CONNECT')
    peer.send('Whatever ' + Math.random())
  })

  peer.on('data', (data) => console.log('data ' + data))
}

module.exports = invitePeer

function invitePeer (initialState) {
  const peer = new SimplePeer({
    initiator: location.hash === '#1'
  })

  // TODO: https://github.com/socketio/socket.io-client
  const socket = window.io()
  socket.on('connect', () => console.log('WebSocket connected'))
  socket.on('disconnect', () => console.log('WebSocket disconnected'))
  socket.on('signal', (data) => {
    console.log('Socket.io Signal received', data)
    peer.signal(data)
  })

  peer.on('error', (error) => console.error('error', error))

  peer.on('signal', async (data) => {
    console.log('WebRTC Signal received', new Date(), data)
    socket.emit('signal', data)
  })

  peer.on('connect', () => {
    console.log('WebRTC CONNECT')
    peer.send(initialState)
  })

  peer.on('data', (data) => {
    let payload
    const serialised = String.fromCharCode.apply(null, data)

    try {
      payload = JSON.parse(serialised)
      window.kontra.emit('remote', payload)
      console.log('data', payload)
    } catch (err) {
      // e.g. Initial handshake
      console.error(err)
    }
  })

  window.kontra.on('userInteraction', (action) => {
    peer.send(JSON.stringify(action))
  })
}

module.exports = invitePeer

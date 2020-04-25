function invitePeer (initialState) {
  const peer = new SimplePeer({
    initiator: initialState.party === 'initiator'
  })

  // TODO: https://github.com/socketio/socket.io-client
  const socket = window.io()
  socket.on('connect', () => {
    console.log('WebSocket connected')
    window.kontra.emit('socket', { status: 'connected' })
  })
  socket.on('disconnect', () => {
    console.log('WebSocket disconnected')
    window.kontra.emit('socket', { status: 'disconnected' })
  })
  socket.on('signal', (data) => {
    console.log('Socket.io Signal received', data)
    peer.signal(data)
  })
  socket.on('connect:new', () => console.log('New WebSocket connected'))
  socket.on('group:opened', (data) => {
    console.log('Group opened', data)
    window.kontra.emit('group:opened', data)
  })
  socket.on('group:pending', (data) => {
    console.log('Current sessions', data)
    window.kontra.emit('group:pending', data)
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

  window.kontra.on('Visitor', (action) => {
    peer.send(JSON.stringify(action))
  })

  const handler = {
    peer,
    socket,
    getSessions: function () {
      socket.emit('group:available')
    },
    joinSession: function (sessionId, name) {
      socket.emit('group:join', { sessionId, name })
    },
    openSession: function () {
      socket.emit('group:open', { initiator: initialState.name })
    }
  }
  return Promise.resolve(handler)
}

module.exports = invitePeer

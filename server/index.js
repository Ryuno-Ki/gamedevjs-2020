const path = require('path')

const express = require('express')
const http = require('http')
const { nanoid } = require('nanoid')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 3000
const DIST_PATH = path.resolve(__dirname, '..', 'dist')

const session = {}

app.use('/', express.static(DIST_PATH))

io.on('connection', (socket) => {
  console.log('Socket connection established')
  socket.broadcast.emit('connect:new')
  socket.on('signal', (data) => {
    socket.broadcast.emit('signal', data)
  })

  socket.on('group:open', (data) => {
    const { initiator } = data
    const sessionId = nanoid()
    session[ sessionId ] = [ initiator ]
    socket.emit('group:opened', sessionId)
    console.log('Sessions', session)
  })

  socket.on('group:available', (data) => {
    console.log('Sending available session', session)
    socket.emit('group:pending', JSON.stringify(session))
  })

  socket.on('group:join', (data) => {
    const { sessionId, name } = data
    session[ sessionId ].push(name)
    const newSession = {
      [ sessionId ]: session[ sessionId ]
    }
    socket.broadcast.emit('group:joined', JSON.stringify(newSession))
  })
})

server.listen(port)
console.log(`Started app server on port ${port}`)

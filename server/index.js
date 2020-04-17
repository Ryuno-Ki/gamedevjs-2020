const path = require('path')

const express = require('express')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 3000
const DIST_PATH = path.resolve(__dirname, '..', 'dist')

app.use('/', express.static(DIST_PATH))

io.on('connection', (socket) => {
  console.log('Socket connection established')

  socket.on('signal', (data) => {
    socket.broadcast.emit('signal', data)
  })
})

server.listen(port)
console.log(`Started app server on port ${port}`)

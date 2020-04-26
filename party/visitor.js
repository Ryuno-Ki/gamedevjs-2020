const loadAssets = require('../assets')
const persistChanges = require('../persistance')
const invitePeers = require('../rtc')
const renderGround = require('../scenes/game.scene')
const renderBall = require('../sprites/ball')
const renderBasket = require('../sprites/basket')
const renderEmoji = require('../sprites/emoji')
const renderPlayer = require('../sprites/player')
const renderScore = require('../sprites/score')

const update = require('../update')

async function startVisitorGame (initialState) {
  const {
    GameLoop,
    init,
    initPointer,
    on,
    track
  } = window.kontra

  const { canvas, context } = init()

  initPointer()
  persistChanges(initialState.party, initialState.name)

  const assets = await loadAssets(initialState.party)
  const [
    basketImage,
    groundImage,
    playerImage,
    ballImage,
    emojisImage
  ] = assets

  const tileEngine = renderGround(groundImage)
  const player = renderPlayer(playerImage, 1)
  const opponent = renderPlayer(playerImage, 2)
  const ball = renderBall(ballImage)
  const playerBasket= renderBasket(basketImage, true)
  const opponentBasket= renderBasket(basketImage, false)
  const playerScore = renderScore(groundImage, true)
  const opponentScore = renderScore(groundImage, false)
  const emojis = [
    'left',
    'right',
    'up',
    'down',
    'ball',
    'goal'
  ].map((name) => renderEmoji(emojisImage, name, initialState.name))

  tileEngine.addObject(player)
  tileEngine.addObject(opponent)
  tileEngine.addObject(ball)
  tileEngine.addObject(playerBasket)
  tileEngine.addObject(opponentBasket)
  tileEngine.addObject(playerScore)
  tileEngine.addObject(opponentScore)
  emojis.forEach((emoji) => tileEngine.addObject(emoji))

  emojis.forEach((emoji) => track(emoji))

  let loop = GameLoop({
    update: () => update({
      canvas,
      tileEngine,
      player,
      opponent,
      ball,
      playerBasket,
      opponentBasket,
      playerScore,
      opponentScore,
      playerName: initialState.name,
      dribblingSound: null,
      throwSound: null,
      whistleSound: null
    }),
    render: () => {
      tileEngine.render()
      playerScore.render()
      opponentScore.render()
      player.render()
      opponent.render()
      playerBasket.render()
      opponentBasket.render()
      ball.render()
      emojis.forEach((emoji) => emoji.render())
    }
  })
  loop.start()
  return Promise.resolve(true)
}

module.exports = startVisitorGame

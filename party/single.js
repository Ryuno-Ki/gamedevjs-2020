const loadAssets = require('../assets')
const handleBackgroundMusic = require('../music.js')
const persistChanges = require('../persistance')
const renderGround = require('../scenes/game.scene')
const renderBall = require('../sprites/ball')
const renderBasket = require('../sprites/basket')
const renderControl = require('../sprites/control')
const renderPlayer = require('../sprites/player')
const renderScore = require('../sprites/score')

const update = require('../update')

async function startSinglePlayerGame (initialState) {
  const {
    GameLoop,
    init,
    initKeys,
    initPointer,
    on,
    track
  } = window.kontra

  const { canvas, context } = init()

  // maybeRescale(canvas, context)
  initKeys()
  initPointer()
  persistChanges(initialState.party, initialState.name)

  const assets = await loadAssets(initialState.party)
  const [
    basketImage,
    groundImage,
    playerImage,
    ballImage,
    crowdSound,
    dribblingSound,
    throwSound,
    whistleSound
  ] = assets

  const tileEngine = renderGround(groundImage)
  const control = renderControl(groundImage)
  const player = renderPlayer(playerImage, 1)
  const opponent = renderPlayer(playerImage, 2)
  const ball = renderBall(ballImage)
  const playerBasket= renderBasket(basketImage, true)
  const opponentBasket= renderBasket(basketImage, false)
  const playerScore = renderScore(groundImage, true)
  const opponentScore = renderScore(groundImage, false)

  track(control)
  tileEngine.addObject(control)

  tileEngine.addObject(player)
  tileEngine.addObject(opponent)
  tileEngine.addObject(ball)
  tileEngine.addObject(playerBasket)
  tileEngine.addObject(opponentBasket)
  tileEngine.addObject(playerScore)
  tileEngine.addObject(opponentScore)

  handleBackgroundMusic(crowdSound)

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
      dribblingSound,
      throwSound
    }),
    render: () => {
      tileEngine.render()
      control.render()
      playerScore.render()
      opponentScore.render()
      player.render()
      opponent.render()
      playerBasket.render()
      opponentBasket.render()
      ball.render()
    }
  })
  loop.start()
  whistleSound.play()
  return Promise.resolve(true)
}

/*
function maybeRescale (canvas, context) {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  if (windowWidth > canvas.width) {
    return
  }

  if (windowHeight > canvas.height) {
    return
  }

  const scaleWidth = 0.95 * windowWidth / canvas.width
  const scaleHeight = 0.95 * windowHeight / canvas.height

  context.imageSmoothingEnabled = false
  context.scale(scaleWidth, scaleHeight)
}
*/

module.exports = startSinglePlayerGame

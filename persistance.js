function persistChanges (gameMode, playerName) {
  listenToUserInteractions()

  if (gameMode === 'visitor') {
    listenToVisitorActions(playerName)
  }
}

function listenToUserInteractions (playerName) {
  const on = window.kontra.on
  const setStoreItem = window.kontra.setStoreItem

  const currentState = {
    player: {
      player: playerName,
      direction: 'idle',
      dx: 0,
      dy: 0
    }
  }

  const actions = []
  actions.push({ ...currentState.player, ts: new Date() - 0 })

  on('userInteraction', (action) => {
    const diff = Object
      .keys(action)
      .map((key) => currentState.player[ key ] !== action[ key ])
      .reduce((soFar, now) => soFar || now)

    if (diff) {
      actions.push({ ...action, ts: new Date() - 0 })
      setStoreItem('actions', actions)
      currentState.player = action
    }
  })
}

function listenToVisitorActions (playerName) {
  const on = window.kontra.on
  const setStoreItem = window.kontra.setStoreItem

  const currentState = {
    player: {
      player: playerName
    }
  }

  const actions = []
  actions.push({ ...currentState.player, ts: new Date() - 0 })

  on('Visitor', (action) => {
    actions.push({ ...action, ts: new Date() - 0 })
    setStoreItem('actions', actions)
  })
}

module.exports = persistChanges

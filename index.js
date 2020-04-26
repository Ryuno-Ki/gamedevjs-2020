const startMultiPlayerGame = require('./party/multi')
const startSinglePlayerGame = require('./party/single')
const startVisitorGame = require('./party/visitor')
const invitePeers = require('./rtc')

;(function () {
  'use strict';
  window.getGlobalData = function () {
    let on = window.kontra.on
    return {
      device: 'unknown',
      step: 1,
      model: {
	backgroundMusic: false,
	backgroundSound: false,
        canvas: {
          width: 11 * 64,
          height: 9 * 64
        },
        chosenParty: '',
        chosenSession: '',
        chosenSessionInitiator: '',
        name: '',
        parties: [{
          mode: 'single',
          label: 'playing alone'
        }, {
          mode: 'initiator',
          label: 'playing with friends'
        }, {
          mode: 'joiner',
          label: 'joining a session'
        }, {
          mode: 'visitor',
          label: 'watching a game'
        }],
        screen: {
          height: window.innerHeight,
          width: window.innerWidth,
          orientation: window.innerHeight < window.innerWidth ? 'landscape' : 'portrait'
        }
      },
      ready: false,
      sessions: [],
      userInteractions: [],
      view: '',
      getInitialState: function () {
        return {
          name: this.model.name,
          party: this.model.chosenParty,
          screenHeight: this.model.screen.height,
          screenWidth: this.model.screen.width
        }
      },
      getSessionMembers: function () {
        return ''
      },
      getSessions: function () {
        const initialState = this.getInitialState()
        return invitePeers(initialState)
          .then((handler) => {
            this.handler = handler
            if (initialState.party === 'initiator') {
              return handler.openSession()
            }
            if (['visitor', 'joiner'].includes(initialState.party)) {
              return handler.getSessions()
            }
            return Promise.resolve(true)
          })
      },
      handler: null,
      handleMobileDevice: function () {
        if (this.isMobileDevice()) {
          this.model.parties = [{
            mode: 'visitor',
            label: 'watching a game'
          }]
        }
      },
      handlePartySelection: function () {
        this.getSessions()
          .then(() => {
	    if (this.model.chosenSession) {
	      this.getSessionMembers()
	    }
            this.step = 3
          })
      },
      handleSession: function () {
        const search = window.location.search
        const queryParams = search.split('=')
        if (queryParams.length === 0) {
          return
        }

        const matches = /^.*session=(\w+).*$/.exec(search)
        if (matches && matches.length >= 2) {
          const session = matches[1]
          console.log('Session', session)
          window.kontra.emit('session:refresh', { session })
          // TODO: Refetch the list of session members from backend
          // TODO: Skip the form part by somehow restoring the user input from localStorage
        }
      },
      init: function () {
        console.log('Alpine ready', this.view)
        this.reset()
        on('userInteraction', (userInteraction) => {
          this.userInteractions.push(userInteraction.direction)
        })
        on('group:pending', (data) => {
          const sessions = JSON.parse(data)
          Object.keys(sessions).forEach((key) => {
            this.sessions.push({ key, initiator: sessions[ key ][ 0 ] })
          })
        })
        on('ready', () => {
          this.ready = true
          this.scrollToStartPosition()
        })
      },
      isMobileDevice: function () {
        if (this.model.screen.orientation === 'portrait' && this.model.screen.width <= this.model.canvas.width) {
          return true
        }
        if (this.model.screen.orientation === 'landscape' && this.model.screen.height <= this.model.canvas.height) {
          return true
        }
        return false
      },
      reset: function () {
        this.ready = false
        this.step = 1,
        this.model.name = '',
	this.model.backgroundMusic = false
	this.model.backgroundSound = false
        this.model.chosenParty = ''
        this.model.chosenSession = ''
        this.model.chosenSessionInitiator = ''
        this.view = ''
        window.localStorage.removeItem('actions')
        window.localStorage.removeItem('state')
        this.handleMobileDevice()
        this.handleSession()
      },
      scrollToStartPosition: function () {
        const scrollToX = this.model.canvas.height / 2
        const scrollToY = this.model.canvas.width / 2
        console.log('Scrolling to', scrollToX, scrollToY)
        setTimeout(() => window.scroll(scrollToX, scrollToY), 0)
      },
      submit: function () {
        if (this.validates()) {
          this.step = 4
	  this.view = 'game'

          const initialState = this.getInitialState()
          window.localStorage.setItem('state', JSON.stringify(initialState))
	  window.localStorage.setItem('score', JSON.stringify({
	    'player': 0,
	    'opponent': 0
	  }))

          if (this.model.chosenParty === 'initiator') {
            invitePeers(initialState)
            startMultiPlayerGame(initialState)
          } else if (this.model.chosenParty === 'joiner') {
            invitePeers(initialState)
	    this.handler.joinSession(this.model.chosenSession, initialState.name)
            startMultiPlayerGame(initialState)
          } else if (this.model.chosenParty === 'single') {
            startSinglePlayerGame(initialState)
	    window.kontra.emit('ready')
          } else {
            invitePeers(initialState)
	    this.handler.joinSession(this.model.chosenSession, initialState.name)
            startVisitorGame(initialState)
          }
        } else {
          console.warn('Form is not valid!')
        }
      },
      toggleBackgroundMusic () {
        window.kontra.emit('backgroundMusic:toggle', this.model.backgroundMusic)
      },
      toggleBackgroundSound () {
        window.kontra.emit('backgroundSound:toggle', this.model.backgroundSound)
      },
      validates: function () {
        return this.step === 3 && this.model && this.model.chosenParty !== ''
      }
    }
  }
})();

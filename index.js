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
        canvas: {
          width: 706,
          height: 572
        },
        chosenParty: '',
        name: '',
        parties: [{
          mode: 'single',
          label: 'playing alone'
        }, {
          mode: 'multi',
          label: 'playing with friends'
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
      userInteractions: [],
      view: 'form',
      init: function () {
        console.log('Alpine ready')
        on('userInteraction', (userInteraction) => {
          this.userInteractions.push(userInteraction.direction)
        })

        if (this.isMobileDevice()) {
          this.model.parties = [{
            mode: 'visitor',
            label: 'watching a game'
          }]
        }
      },
      isMobileDevice: function () {
        if (this.model.screen.orientation === 'portrait' && this.model.screen.width <= this.model.canvas.width) {
          return true
        }
        if (this.model.screen.orientation === 'landscape' && this.model.screen.height <= this.model.canvas.width) {
          return true
        }
        return false
      },
      reset: function () {
        this.step = 1,
        this.model.name = '',
        this.model.chosenParty = ''
        this.view = 'form'
        window.localStorage.removeItem('state')
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

          const initialState = {
            name: this.model.name,
            party: this.model.chosenParty,
            screenHeight: this.model.screen.height,
            screenWidth: this.model.screen.width
          }
          window.localStorage.setItem('state', JSON.stringify(initialState))

          if (this.chosenParty === 'multi') {
            invitePeers(initialState)
            startMultiPlayerGame(initialState)
              .then(() => {
                this.ready = true
                this.scrollToStartPosition()
              })
          } else if (this.chosenParty === 'single') {
            startSinglePlayerGame(initialState)
              .then(() => {
                this.ready = true
                this.scrollToStartPosition()
              })
          } else {
            startVisitorGame(initialState)
              .then(() => {
                this.ready = true
                this.scrollToStartPosition()
              })
          }
        }
      },
      validates: function () {
        return this.step === 3 && this.model !== '' && this.party !== null
      }
    }
  }
})();

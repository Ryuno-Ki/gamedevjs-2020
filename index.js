const startMultiPlayerGame = require('./party/multi')
const startSinglePlayerGame = require('./party/single')
const invitePeers = require('./rtc')

;(function () {
  'use strict';
  window.getGlobalData = function () {
    let on = window.kontra.on
    return {
      device: 'unknown',
      step: 1,
      model: {
        chosenParty: null,
        name: '',
        parties: [{
          mode: 'single',
          label: 'playing alone'
        }, {
          mode: 'multi',
          label: 'playing with friends'
        }],
        screen: {
          height: window.innerHeight,
          width: window.innerWidth
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
      },
      nextStep: function (step) {
        this.step = step
      },
      reset: function () {
        this.step = 1,
        this.model.name = '',
        this.model.chosenParty = null
        this.view = 'form'
        window.localStorage.removeItem('state')
      },
      submit: function () {
        if (this.validates()) {
          this.step = 4

          const initialState = {
            name: this.model.name,
            party: this.model.chosenParty.mode,
            screenHeight: this.model.screen.height,
            screenWidth: this.model.screen.width
          }
          window.localStorage.setItem('state', JSON.stringify(initialState))

          if (this.model.party === 'multi') {
            invitePeers(initialState)
            startMultiPlayerGame(initialState)
              .then(() => {
                this.ready = true
              })
          } else {
            startSinglePlayerGame(initialState)
              .then(() => {
                this.ready = true
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

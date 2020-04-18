const kontra = require('kontra')

const startMultiPlayerGame = require('./party/multi')
const startSinglePlayerGame = require('./party/single')
const invitePeers = require('./rtc')

;(function () {
  'use strict';
  window.getGlobalData = function () {
    let on = kontra.on
    return {
      step: 1,
      model: {
        name: '',
        party: null
      },
      ready: false,
      userInteractions: [],
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
        this.model.party = null
        window.localStorage.removeItem('state')
      },
      submit: function () {
        if (this.validates()) {
          this.step = 4

          const initialState = {
            name: this.model.name,
            party: this.model.party
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

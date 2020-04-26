const fs = require('fs')
const path = require('path')

const rawAssets = require('./assets.json')

function transformAssets () {
  let transformedAssets = {}
  Object.keys(rawAssets).forEach((key) => {
    transformedAssets[ key ] = []
    rawAssets[ key ].forEach((assetPath) => {
      transformedAssets[ key ].push(`./assets/${ path.basename(assetPath) }`)
    })
  })
  fs.writeFileSync('./assets-to-load.json', JSON.stringify(transformedAssets))
  console.log('Written transformed assets')
}

transformAssets()

const { TileEngine } = require('kontra')

// Kudos https://opengameart.org/content/sports-pack-350
function renderGround (tilesheet) {
  let tileEngine = TileEngine({
    tilewidth: 64,
    tileheight: 64,

    width: 8,
    height: 8,

    tilesets: [{ firstgid: 1, image: tilesheet }],

    layers: [{
      name: 'ground',
        data: [
           2,  3,  3,  3,  3,  3,  3,  5,
          15,  1,  1,  1,  1,  1,  1, 18,
          15,  1,  1,  1,  1,  1,  1, 18,
          15,  1,  1,  1,  1,  1,  1, 18,
          15,  1,  1,  1,  1,  1,  1, 18,
          15,  1,  1,  1,  1,  1,  1, 18,
          15,  1,  1,  1,  1,  1,  1, 18,
          41, 42, 42, 42, 42, 42, 42, 44
        ]
    }]
  })

  return tileEngine
}

module.exports = renderGround

const { TileEngine } = require('kontra')

// Kudos https://opengameart.org/content/sports-pack-350
function renderGround (tilesheet) {
  let tileEngine = TileEngine({
    tilewidth: 64,
    tileheight: 64,

    width: 11,
    height: 9,

    tilesets: [{ firstgid: 1, image: tilesheet }],

    layers: [{
      name: 'ground',
      data: [
            1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,
            2,   3,   3,   3,   3,   4,   3,   3,   3,   3,   5,
          101, 102,   1,   1,   1,  17,   1,   1,   1,  94,  95,
           15,   1, 116,   1,   8,  47,  10,   1, 106,   1,  18,
           15,   1, 129,   1,  21,  17,  23,   1, 119,   1,  18,
           15,   1, 142,   1,  34,  49,  36,   1, 132,   1,  18,
          153, 154,   1,   1,   1,  17,   1,   1,   1, 146, 147,
           41,  42,  42,  42,  42,  43,  42,  42,  42,  42,  44,
            1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1
        ]
    }]
  })

  return tileEngine
}

module.exports = renderGround

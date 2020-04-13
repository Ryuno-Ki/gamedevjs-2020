import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'index.js',
  output: {
    file: 'game.js',
    format: 'umd',
    name: 'game'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}

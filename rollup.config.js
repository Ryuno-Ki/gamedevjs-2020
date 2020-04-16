import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import banner from 'rollup-plugin-banner'
import copy from 'rollup-plugin-copy'
import html from 'rollup-plugin-html2'
import filesize from 'rollup-plugin-filesize'
import sizes from 'rollup-plugin-sizes'
import { terser } from 'rollup-plugin-terser'

const gpl = `This game is a homage to https://xkcd.com/2291/
Copyright (C) 2020 - André Jaenisch

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.`

const htmlOptions = {
  template: './index.html',
  fileName: './dist/index.html',
  onlinePath: 'https://ryuno-ki.github.io/gamedevjs-2020',
  minify: true
}

const copyOptions = {
  flatten: false,
  targets: [{
    src: 'assets/socket.io.js', dest: 'dist/',
  }, {
    src: 'node_modules/simple-peer/simplepeer.min.js', dest: 'dist/',
  }, {
    src: 'assets/**/*.png', dest: 'dist/assets/'
  }]
}

export default {
  input: 'index.js',
  output: {
    file: 'dist/game.js',
    format: 'umd',
    name: 'game'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
    banner(gpl),
    html(htmlOptions),
    copy(copyOptions),
    sizes(),
    filesize()
  ]
}

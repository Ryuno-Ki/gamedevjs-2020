import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import banner from 'rollup-plugin-banner'
import copy from 'rollup-plugin-copy'
import html from 'rollup-plugin-html2'
import filesize from 'rollup-plugin-filesize'
import sizes from 'rollup-plugin-sizes'
import { terser } from 'rollup-plugin-terser'

import * as assets from './assets.json'

const assetsToCopy = []
  .concat(assets.single)
  .concat(assets.initiator)
  .concat(assets.joiner)
  .concat(assets.visitor)

const gpl = `This game is a homage to https://xkcd.com/2291/
Copyright (C) 2020 - André Jaenisch

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.`

const htmlOptions = {
  template: './index.html',
  fileName: './dist/index.html',
  // onlinePath: 'https://ryuno-ki.github.io/gamedevjs-2020',
  minify: true
}

const copyOptions = {
  targets: [{
    src: 'favicon.ico', dest: 'dist/',
  }, {
    src: 'style.css', dest: 'dist/',
  }, {
    src: 'assets/socket.io.js', dest: 'dist/',
  }, {
    src: 'assets/fonts/Press_Start_2P/PressStart2P-Regular.ttf', dest: 'dist/'
, }, {
    src: 'node_modules/alpinejs/dist/alpine.js', dest: 'dist/',
  }, {
    src: 'node_modules/kontra/kontra.min.js', dest: 'dist/',
  }, {
    src: 'node_modules/simple-peer/simplepeer.min.js', dest: 'dist/',
  }, {
    src: 'assets/**/*.mp3', dest: 'dist/assets/'
  }, {
    src: assetsToCopy, dest: 'dist/assets/'
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
    json(),
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

#!/usr/bin/env node

require('babel-core/register')({
  presets: ['es2015', 'es2016', 'stage-0']
});

require("babel-polyfill");

require('../lib');
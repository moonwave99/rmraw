#!/usr/bin/env node
var argv  = require('yargs').argv;
var rmraw = require('../lib/index');

rmraw({
    dir: argv.dir || argv._[0],
    RAW_EXT: argv.raw_ext,
    JPG_EXT: argv.jpg_ext,
});

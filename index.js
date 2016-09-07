var glob    = require('globby');
var Promise = require('bluebird');
var path    = require('path');
var fs      = Promise.promisifyAll(require('fs-extra'));
var _       = require('lodash');
var argv    = require('yargs').argv;

var dir = argv.dir;
var RAW_EXT = argv.raw_ext || '.RAF';
var JPG_EXT = argv.jpg_ext || '.JPG';

// Removes RAW files without a JPEG counterpart.
glob(['*' + RAW_EXT, '*' + JPG_EXT], { cwd: dir }).then((files) => {
    var paths = _.partition(files, (f) => path.extname(f) === JPG_EXT);
    var jpegs = paths[0];
    var raws = paths[1];
    _.difference(
        raws.map( x => path.basename(x, RAW_EXT)),
        jpegs.map( x => path.basename(x, JPG_EXT))
    ).forEach( filename => {
        var pathToRemove = path.join(dir, filename + RAW_EXT);
        console.log('Removing: ' + pathToRemove);
        fs.remove(pathToRemove);
    });
});

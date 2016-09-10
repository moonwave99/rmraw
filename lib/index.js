var glob    = require('globby');
var Promise = require('bluebird');
var path    = require('path');
var fs      = require('fs-extra');
var _       = require('lodash');

var options = {
    dir: process.cwd(),
    RAW_EXT: '.RAF',
    JPG_EXT: '.JPG',
};

module.exports = (opts) => {
    _.merge(options, opts);
    console.log('\nCrawling ' + options.dir + ':\n');
    return glob(
        ['*' + options.RAW_EXT, '*' + options.JPG_EXT],
        { cwd: options.dir }
    ).then((files) => {
        var paths = _.partition(files, (f) => path.extname(f) === options.JPG_EXT);
        var diff = _.difference(
            paths[1].map( x => path.basename(x, options.RAW_EXT)),
            paths[0].map( x => path.basename(x, options.PG_EXT))
        );
        return Promise.all(diff.map((filename) => {
            var pathToRemove = path.join(options.dir, filename + options.RAW_EXT);
            console.log('- removing ' + pathToRemove + '...');
            return new Promise((resolve, reject) => {
                fs.remove(pathToRemove, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(pathToRemove);
                    }
                });
            });
        })).then((files) => {
            console.log('\nRemoved ' + files.length + ' file(s).');
        });
    });
};

/*
 * grunt-filerev-qiniu
 * https://github.com/dylike/grunt-filerev-qiniu
 *
 * Copyright (c) 2016 YuD
 * Licensed under the MIT license.
 */

'use strict';

/**
 * getLocator based on filerev
 * @param grunt
 * @param options
 * @returns {*}
 */
//
// Return which locator to use to get the revisioned version (revved) of the files, with, by order of
// preference:
// - a map object passed in option (revmap)
// - a map object produced by grunt-filerev if available
// - a disk lookup
//
var getLocator = function (grunt, options) {
    var locator;
    if (options.revmap) {
        locator = grunt.file.readJSON(options.revmap);
    } else if (grunt.filerev && grunt.filerev.summary) {
        locator = grunt.filerev.summary;
    } else {
        locator = function (p) {
            return grunt.file.expand({
                filter: 'isFile'
            }, p);
        };
    }
    return locator;
};


module.exports = function (grunt) {
    var qiniu = require('qiniu');
    var q = require('q');
    var path = require('path');

    var uptoken = function (bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key);
        return putPolicy.token();
    };

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('qiniu', 'upload css, js, images... to qiniu based on grunt.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({});

        var done = this.async();

        if (!(options.accessKey && options.secretKey && options.bucket && options.domain)) {
            grunt.fail.fatal('options need accessKey, secretKey, bucket!');
        }

        qiniu.conf.ACCESS_KEY = options.accessKey;
        qiniu.conf.SECRET_KEY = options.secretKey;

        var bucket = options.bucket;
        var domain = options.domain || '';

        /**
         * locator from grunt.filerev.summary or options.revmap
         * @type {*}
         * @example
         * { 'dist/scripts/scripts.js': 'dist/scripts/scripts.8158506f.js'
         *   ...
         * }
         */
        var locator = getLocator(grunt, options);

        var newSummary = JSON.parse(JSON.stringify(locator));

        var promiseArray = [];

        Object.keys(locator).forEach(function (k) {
            var srcPath = locator[k];

            var absoluteFilePath = srcPath;

            if (!grunt.file.isPathAbsolute(srcPath)) {
                absoluteFilePath = path.resolve(srcPath);
            }

            var key = absoluteFilePath;

            grunt.log.debug('Generate uptoken for ' + key);

            var token = uptoken(bucket, key);

            grunt.log.writeln('Start uploading ' + key);

            var promise = q.Promise(function (resolve, reject) {
                q.ninvoke(qiniu.io, 'putFile', token, key, absoluteFilePath, null, function (err, ret) {
                    grunt.log.writeln('Uploaded ' + ret.key);
                    newSummary[k] = path.join(domain, ret.key);
                    resolve();
                });
            });

            promiseArray.push(promise);
        });

        q.all(promiseArray)
            .then(function () {
                //grunt.filerev.summary = newSummary;
                grunt.log.writeln('All done...');
                done();
            });
    });

};

'use strict';

var grunt = require('grunt');

var request = require('request');
var path = require('path');
var q = require('q');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(filerev, origin, [message])
 test.notEqual(filerev, origin, [message])
 test.deepEqual(filerev, origin, [message])
 test.notDeepEqual(filerev, origin, [message])
 test.strictEqual(filerev, origin, [message])
 test.notStrictEqual(filerev, origin, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.qiniu = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    dist: function (test) {
        //test expect 1
        //test.expect(4);

        var promiseArray = [];
        var qiniuConfig = grunt.config.get('qiniu').dist.options;


        // compare source file and origin file
        grunt.file.recurse('test/dest', function (abspath, rootdir, subdir, filename) {
            var filerev = grunt.file.read(abspath);
            var origin = grunt.file.read('test/source/script.js');

            test.equal(filerev, origin, 'origin file should equal to source file');

            var promise = q.Promise(function (resolve, reject) {

                var url = path.join(qiniuConfig.version ? qiniuConfig.version : '', filename);
                url = qiniuConfig.domain + url;

                request.get(url, function (a, b, c) {

                    // compare upload file and origin file
                    test.equal(filerev, c, 'upload file should equal to filerev file');

                    // compare uplaod file and source file
                    test.equal(origin, c, 'upload file should equal to origin file');

                    resolve();
                });
            });

            promiseArray.push(promise);

        });

        var revmap = grunt.file.readJSON(qiniuConfig.revmap);

        for (var i in revmap) {
            if (revmap.hasOwnProperty(i)) {
                var origin = grunt.file.read(revmap[i]);
                var promise = q.Promise(function (resolve, reject) {

                    var filename = path.basename(revmap[i]);

                    var url = path.join(qiniuConfig.version ? qiniuConfig.version : '', filename);

                    url = qiniuConfig.domain + url;

                    request.get(url, function (a, b, c) {

                        test.equal(origin, c, 'upload revmap.json file should equal to origin file');

                        resolve();

                    });
                });

                promiseArray.push(promise);
            }
        }

        q.all(promiseArray)
            .then(function () {
                //grunt.filerev.summary = newSummary;
                grunt.log.writeln('All done...');
                test.done();
            });
    }
};

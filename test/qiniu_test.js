'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
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
        test.expect(1);

        // compare source file and filerev file
        var actual;
        grunt.file.recurse('test/dest', function (abspath, rootdir, subdir, filename) {
            actual = grunt.file.read(abspath);
            var expected = grunt.file.read('test/source/style.css');
            test.equal(actual, expected, 'filerev file should equal to source file');
            test.done();
        });

        // compare upload file and filerev file

        // compare uplaod file and source file
    }
};

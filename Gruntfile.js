/*
 * grunt-qiniu
 * https://github.com/dylike/grunt-qiniu
 *
 * Copyright (c) 2016 YuD
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp', 'test/dest']
        },

        filerev: {
            dist: {
                src: [
                    'test/source/{,*/}*.*',
                ],
                dest: 'test/dest'
            }
        },

        // Configuration to be run (and then tested).
        qiniu: {
            dist: {
                options: {
                    accessKey: '_ATGryARBwpe-DEONUbpzef-OkKQXhWXulwgbp2V',
                    secretKey: 'nqV7A8pTd4ov7RpryIpxZJ_K2AFMfF4QHyXSkrZg',
                    bucket: 'metalab-test',
                    domain: 'http://7xixj1.com1.z0.glb.clouddn.com/',
                    version: 'grunt-filerev-qiniu'
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    //grunt.registerTask('test', ['clean', 'filerev', 'qiniu']);
    //grunt.registerTask('test', ['clean', 'filerev', 'qiniu', 'nodeunit']);
    grunt.registerTask('test', ['clean', 'filerev', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};

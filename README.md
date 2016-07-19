# grunt-filerev-qiniu

> upload css, js, images... to qiniu based on grunt.

[![Build Status](https://travis-ci.org/dylike/grunt-filerev-qiniu.svg?branch=master)](https://travis-ci.org/dylike/grunt-filerev-qiniu)

## Introduction

For speed up the website, static files often stored in a special static file server or CDN.

I'm using `yo angular` to generate my project scaffold, it's using the `filerev, usemin` to tag a file version, and
rewrites file name based on `filerev`.

So `grunt-filerev-qiniu` is a quick way to upload static files such as images,
styles, scripts to qiniu based on the `filerev` result `grunt.filerev.summary`.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filerev-qiniu --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filerev-qiniu');
```

## The "qiniu" task

### Options

1. secretKey
2. accessKey
3. bucket
4. domain
5. revmap
6. version

### Usage Examples

```js
grunt.initConfig({
  qiniu: {
    options: {
        /*
          require
        */
        secretKey: 'Your SK',
        accessKey: 'Your AK',
        bucket: 'Your bucket',
        /*
          optional
        */
        domain: 'Your domain'
        revmap: 'Path of revmap file'
        // if not declared will directly use grunt.filerev.summary
        /* the revmap file should like
        *    {
        *       originName: newName
        *       ......
        *    }
        */
        version: 'version' // if have version, the url like http://domain/version/filename
    },
  },
});
```
### Something more.

When start with `filerev` and `usemin`, there is a sample config when using `usemin`.
```js

var replaceWithQiniu = function(m) {
    // if have version
    return 'qiniu bocket domain' + path.join(version, path.basename(m)) + '?' + new Date().getTime();
}

usemin: {
    html: ['<%= yeoman.dist %>/{,*/}*.html'],
    css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
    js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
    options: {
        assetsDirs: [
            '<%= yeoman.dist %>',
            '<%= yeoman.dist %>/images',
            '<%= yeoman.dist %>/styles'
        ],
        patterns: {
            js: [[/((\.*\/)*images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images', null, replaceWithQiniu]],
            html: [[/((\.*\/)*(scripts|styles)\/[^''""]*\.(js|css))/g, 'Replacing cdn references', null, replaceWithQiniu]],
            css: [[/((\.*\/)*images\/[^)]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing cdn references', null, replaceWithQiniu]]
        }
    }
}
```

And task sequence.

```js
grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'filerev', // filerev task
        'usemin', // replace the file name in index.html to filerev name
        'qiniu', // upload the static files to qiniu
    ]);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
2016-7-12 v0.1.0 init
2016-7-18 v0.1.2 add options: version

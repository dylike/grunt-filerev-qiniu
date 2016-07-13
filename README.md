# grunt-qiniu

> upload css, js, images... to qiniu based on grunt.

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

### Usage Examples

```js
grunt.initConfig({
  qiniu: {
    options: {
        secretKey: 'Your SK',
        accessKey: 'Your AK',
        bucket: 'Your bucket',
        domain: 'Your domain'
    },
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

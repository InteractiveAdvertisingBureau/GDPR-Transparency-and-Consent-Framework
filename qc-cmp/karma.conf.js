// Karma configuration
var webpackConfig = require('./webpack.config.js')('dev');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // test results reporter to use
    reporters: ['progress', 'karmaHTML'],

    // frameworks to use
    frameworks: ['jasmine-dom', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: './test/*.js', watched: true, included: true },
      { pattern: './src/*.js', included: true }
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/*.js': ['webpack'],
      './test/*.js': ['webpack']
    },

    webpack: webpackConfig,

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // Definitions of those browsers are in customLaunchers section below.
    browsers: [
      'Chrome',
      'Firefox',
      'Safari',
      'Opera',
      'bs_ie10_windows',
      'bs_ie11_windows',
      'bs_edge_windows'
    ],

    // plugins
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-browserstack-launcher',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-jasmine-dom',
      'karma-html'
    ],

    // browserStack configuration
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY
    },

    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,

    // Those definitions are for BrowserStack.
    customLaunchers: {
      // windows
      bs_ie6_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '6.0',
        os: 'Windows',
        os_version: 'XP'
      },
      bs_ie7_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '7.0',
        os: 'Windows',
        os_version: 'XP'
      },
      bs_ie8_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '8.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie9_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '9.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie10_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie11_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_edge_windows: {
        base: 'BrowserStack',
        browser: 'edge',
        browser_version: '16.0',
        os: 'Windows',
        os_version: '10'
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    client: {
      clearContext: false,
      //karma-html configuration, karmaHTML is for testing iframe in Karma
      karmaHTML: {
        source: [{ src: './test/iframe-content.html', tag: 'iframeContent' }],
        auto: true
      }
    }
  });
};

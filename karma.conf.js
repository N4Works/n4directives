(function () {
  'use strict';

  /*jslint node: true */

  module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine'],
      files: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'src/**/*.js',
        'test/**/*_test.js'
      ],
      exclude: [],
      preprocessors: {
        'n4-directives': 'coverage'
      },
      coverageReporter: {
        type: 'lcov',
        dir: 'coverage'
      },
      reporters: ['progress', 'coverage'],
      port: 3100,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['PhantomJS', 'Chrome', 'IE', 'Opera', 'Safari', 'Firefox', 'FirefoxNightly', 'ChromeCanary'],
      singleRun: false
    });
  };
}());

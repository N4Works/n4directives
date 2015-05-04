(function () {
  'use strict';

  /*jslint node: true */

  var gulp = require('gulp'),
    coveralls = require('gulp-coveralls'),
    karma = require('karma').server;

  gulp.task('test', function (done) {
    karma.start({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      browsers: ['PhantomJS']
    }, done);
  });

  gulp.task('coverage', ['test'], function (done) {
    gulp.src('coverage/**/lcov.info')
      .pipe(coveralls());
  });
}());
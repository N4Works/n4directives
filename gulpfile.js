(function () {
  'use strict';

  /*jslint node: true */

  var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    coveralls = require('gulp-coveralls'),
    karma = require('karma').server;

  gulp.task('build-js', function () {
    return gulp.src('src/**/*.js')
      .pipe(concat('n4directives.js'))
      .pipe(gulp.dest('dist'))
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('build-css', function () {
    return gulp.src('src/**/*.css')
      .pipe(concat('n4directives.css'))
      .pipe(gulp.dest('dist'))
      .pipe(cssmin())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('build', ['test', 'build-js', 'build-css'], function (done) {
    done();
  });

  gulp.task('test', function (done) {
    /*jslint nomen: true */
    karma.start({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      browsers: ['PhantomJS']
    }, done);
    /*jslint nomen: false */
  });

  gulp.task('test-watch', function (done) {
    /*jslint nomen: true */
    karma.start({
      configFile: __dirname + '/karma.conf.js',
      singleRun: false,
      browsers: ['PhantomJS']
    }, done);
    /*jslint nomen: false */
  });

  gulp.task('coverage', ['test'], function (done) {
    gulp.src('coverage/**/lcov.info')
      .pipe(coveralls());
  });
}());

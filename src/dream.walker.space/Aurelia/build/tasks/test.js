var gulp = require('gulp');
var Karma = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
  new Karma({
    configFile: __dirname + '/../../../karma.conf.js',
    singleRun: true
  }, function() { done(); }).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function(done) {
  new Karma({
    configFile: __dirname + '/../../../karma.conf.js'
  }, function() { done(); }).start();
});

/**
 * Run test once with code coverage and exit
 */
gulp.task('cover', function(done) {
  new Karma({
    configFile: __dirname + '/../../../karma.conf.js',
    singleRun: true,
    reporters: ['coverage'],
    preprocessors: {
      'Aurelia/test/**/*.js': ['babel'],
      'Aurelia/src/**/*.js': ['babel', 'coverage']
    },
    coverageReporter: {
      includeAllSources: true,
      instrumenters: {
        isparta: require('isparta')
      },
      instrumenter: {
          'Aurelia/src/**/*.js': 'isparta'
      },
      reporters: [
        { type: 'html', dir: 'coverage' },
        { type: 'text' }
      ]
    }
  }, done).start();
});

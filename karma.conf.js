module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'browserify'],

    files: [
      'src/**/*.js',
    ],

    exclude: [
    ],

    preprocessors: {
      'src/**/*.js': ['browserify'],
    },

    reporters: ['progress', 'coverage'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true,

    concurrency: Infinity,

    browserify: {
      debug: true,
      transform: [
        require('browserify-istanbul')({
          instrumenter: require('isparta'),
          ignore: ['**/*.spec.js']
        }),
        'babelify',
      ]
    },

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcov', subdir: 'lcov'},
      ]
    }
  })
}

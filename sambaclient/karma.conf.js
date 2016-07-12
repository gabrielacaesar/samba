module.exports = function(config) {
	config.set({
		frameworks: ['jasmine', 'browserify'],
		files: [
			'app/config/**/*.js',
			'app/scripts/**/*.js',
			'test/**/*.spec.js'
		],
		preprocessors: {
			'test/**/*.spec.js': ['browserify'],
			'app/config/**/*.js': ['browserify'],
			'app/scripts/**/*.js': ['browserify'],
		},
		browserify: {
			debug: true,
			configure: function(bundle) {
				bundle.once('prebundle', function() {
					bundle
						.external('react/addons')
						.external('react/lib/ReactContext')
						.external('react/lib/ExecutionEnvironment')
						.transform('babelify', {
							presets: ['es2015', 'react', 'airbnb']
						})
						.transform('aliasify', {
							replacements: {
								'pages/(.*)': './app/scripts/pages/$1',
								'services/(.*)': './app/scripts/services/$1'
							}
						});
				});
			}
		},
		exclude: [],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false
	});
};

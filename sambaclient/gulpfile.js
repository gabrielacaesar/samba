var gulp = require('gulp');
var _ = require('lodash');

var $ = require('gulp-load-plugins')();
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var jsValidate = require('gulp-jsvalidate');
var runSequence = require('run-sequence');
var nodeResolve = require('resolve');
var buffer = require('vinyl-buffer');
var Server = require('karma').Server;

gulp.task('clean', function() {
	return del(['dist/**']);
});

function applyTransformations(b) {
	return b.transform('babelify', {
		presets: ['es2015', 'react']
	})
	.transform('aliasify', {
		replacements: {
			'pages/(.*)': './app/scripts/pages/$1',
			'services/(.*)': './app/scripts/services/$1',
			'ThemeWrapper': './app/scripts/ThemeWrapper.js'
		}
	});
}

gulp.task('browserify:vendor', function(done) {
    var b = browserify({ debug: true });
    getNPMPackageIds().forEach(function(id) {
        b.require(nodeResolve.sync(id), {
            expose: id,
			debug: true
        });
    });

    b.bundle()
        .on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('dist/scripts'))
		.on('end', done);
});

gulp.task('browserify:app', function(done) {
	var filePath = './app/scripts/app.js';
	var extensions = ['.jsx'];

	var b = browserify({
			entries: [filePath],
			extensions: extensions,
			debug: true
		});

	b = applyTransformations(b);

    getNPMPackageIds().forEach(function (id) {
        b.external(id);
    });

    b.bundle()
        .pipe(source('app.js'))
		.pipe(gulp.dest('dist/scripts'))
		.on('end', done);
});

gulp.task('browserify:test', function(done) {
	var filePath = './app/scripts/app.js';
	var extensions = ['.jsx'];

	var b = browserify({
			entries: [filePath],
			extensions: extensions,
			debug: true
		});

	b = applyTransformations(b);

    b.bundle()
     	.pipe(source('test.js'))
		.pipe(gulp.dest('dist/scripts'))
		.on('end', done);
});

gulp.task('bundleCss', function() {
	return gulp.src('app/**/*.css')
		.pipe($.concatCss('bundle.css'))
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('copy', function() {
	return gulp.src(['app/*.txt', 'app/*.ico', 'app/index.html'])
		.pipe(gulp.dest('dist'));
});

gulp.task('webserver', ['build'], function() {
	gulp.src('dist')
		.pipe($.webserver({
			host: 'localhost',
			livereload: true,
			open: true
		}));
});

gulp.task('serve', ['webserver'], function() {
	gulp.watch('app/*.html');
	gulp.watch('app/config/**/*.js', ['browserify:app']);
	gulp.watch('app/scripts/**/*.js', ['browserify:app']);
	gulp.watch('app/scripts/**/*.jsx', ['browserify:app']);
	gulp.watch('app/styles/**/*.css', ['bundleCss']);
});

gulp.task('validate', function () {
	return gulp.src('app.js')
		.pipe(jsValidate());
});

gulp.task('test', ['browserify:test'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('build', ['clean'], function(done) {
	runSequence(
        ['browserify:app', 'browserify:vendor', 'bundleCss', 'copy'],
		'validate',
		done
	);
});

gulp.task('default', ['build']);

/////helper methods
function getNPMPackageIds(isTest) {
    var packageManifest = {};
    try {
    	packageManifest = require('./package.json');
    } catch (e) { }
	if(isTest) {
		return _.concat(_.keys(packageManifest.dependencies) || [], _.keys(packageManifest.devDependencies) || []);
	} else {
		return _.keys(packageManifest.dependencies) || [];
	}

}

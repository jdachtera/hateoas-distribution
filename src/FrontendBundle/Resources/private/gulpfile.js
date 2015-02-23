'use strict';

var gulp       = require('gulp'),
	bowerFiles = require('main-bower-files'),
	stylish    = require('jshint-stylish'),
	path       = require('path'),
	open       = require('open'),
	fs         = require('fs'),
	chalk      = require('chalk'),
	args       = require('yargs').argv,
	map        = require('map-stream'),
	browserSync = require('browser-sync'),
	runSequence = require('run-sequence'),
	gulpPlugins = require('gulp-load-plugins')(),
    reload      = browserSync.reload
    ;

// chalk config
var errorLog  = chalk.red.bold,
	hintLog   = chalk.blue,
	changeLog = chalk.red;

var	SETTINGS = {
	src: {
		app: 'app/',
		css: 'app/css/',
		js: 'app/js/',
		templates: 'app/templates/',
		images: 'app/img/',
		fonts: 'app/fonts/',
		bower: 'bower_components/',
        twigTemplate: '../views/Frontend/index.html.twig'

	},
	build: {
		app: '../public/',
		css: '../public/css/',
		js: '../public/js/',
		templates: '../public/templates/',
        templatesModule: 'app',
        templatesBase: 'bundles/frontend/templates/',
		images: '../public/img/',
		fonts: '../public/fonts/',
		bower: '../public/bower/' // If you change this, you will have to change in index.html as well.
	}
};

var bowerConfig = {
	paths: {
		bowerDirectory: SETTINGS.src.bower,
		bowerrc: '.bowerrc',
		bowerJson: 'bower.json'
	}
};

// jsHint Options.
var hintOptions = JSON.parse(fs.readFileSync('.jshintrc', 'utf8'));

var mapsFilter = gulpPlugins.filter(['!**/*.js.map', '!**/*.css.map']);

gulp.task('tasks', gulpPlugins.taskListing);

/*============================================================
=                          JS-HINT                          =
============================================================*/

gulp.task('js:hint', function () {

	console.log('-------------------------------------------------- JS - HINT');
	return gulp.src([SETTINGS.src.js + 'app.js', '!' + SETTINGS.src.js + 'plugins/*.js', SETTINGS.src.js + '**/*.js', 'gulpfile.js'])
		.pipe(gulpPlugins.jshint(hintOptions))
		.pipe(gulpPlugins.jshint.reporter(stylish));
});


/*============================================================
=                          Concat                           =
============================================================*/

gulp.task('concat', ['concat:bower', 'concat:js', 'concat:css']);


gulp.task('concat:bower', function () {
	console.log('-------------------------------------------------- CONCAT :bower');

	var jsFilter = gulpPlugins.filter('**/*.js'),
		cssFilter = gulpPlugins.filter('**/*.css'),
		assetsFilter = gulpPlugins.filter(['!**/*.js', '!**/*.css', '!**/*.scss']);


	return gulp.src(bowerFiles(bowerConfig), {base: '.'})
		.pipe(jsFilter)
        .pipe(gulpPlugins.if(args.debug, gulpPlugins.filelog('bower js')))
        .pipe(gulpPlugins.sourcemaps.init({loadMaps: true}))
		.pipe(gulpPlugins.concat('_bower.js'))
        .pipe(gulpPlugins.sourcemaps.write('.'))
		.pipe(gulp.dest(SETTINGS.build.bower))
        .pipe(gulpPlugins.filter(['!**/*.js.map']))
        .pipe(gulpPlugins.ngAnnotate())
        .pipe(gulpPlugins.uglify())
        .pipe(gulpPlugins.concat('_bower.min.js'))
        .pipe(gulp.dest(SETTINGS.build.bower))
		.pipe(jsFilter.restore())
		.pipe(cssFilter)
        .pipe(gulpPlugins.if(args.debug, gulpPlugins.filelog('bower css')))
        .pipe(gulpPlugins.sourcemaps.init({loadMaps: true}))
		.pipe(map(function (file, callback) {
			var relativePath = path.dirname(path.relative(path.resolve(SETTINGS.src.bower), file.path));

			// CSS path resolving
			// Taken from https://github.com/enyojs/enyo/blob/master/tools/minifier/minify.js
			var contents = file.contents.toString().replace(/url\([^)]*\)/g, function (match) {
				// find the url path, ignore quotes in url string
				var matches = /url\s*\(\s*(('([^']*)')|("([^"]*)")|([^'"]*))\s*\)/.exec(match),
					url = matches[3] || matches[5] || matches[6];

				// Don't modify data and http(s) urls
				if (/^data:/.test(url) || /^http(:?s)?:/.test(url)) {
					return 'url(' + url + ')';
				}
				return 'url(' + path.join(path.relative(SETTINGS.build.bower, SETTINGS.build.app), SETTINGS.build.bower, relativePath, url) + ')';
			});
			file.contents = new Buffer(contents);

			callback(null, file);
		}))
		.pipe(gulpPlugins.concat('_bower.css'))
        .pipe(gulpPlugins.sourcemaps.write('.'))
		.pipe(gulp.dest(SETTINGS.build.bower))
        .pipe(gulpPlugins.filter(['!**/*.css.map']))
        .pipe(gulpPlugins.minifyCss({keepSpecialComments: '*'}))
        .pipe(gulpPlugins.concat('_bower.min.css'))
        .pipe(gulp.dest(SETTINGS.build.css))
		.pipe(cssFilter.restore())
		.pipe(assetsFilter)
        .pipe(gulpPlugins.if(args.debug, gulpPlugins.filelog()))
		.pipe(gulp.dest(SETTINGS.build.bower))
		.pipe(assetsFilter.restore());
});

gulp.task('concat:js', ['js:hint'], function () {

	console.log('-------------------------------------------------- CONCAT :js');
	return gulp.src([SETTINGS.src.js + 'plugins/*.js', SETTINGS.src.js + 'app.js', SETTINGS.src.js + '*.js', SETTINGS.src.js + '**/*.js'], {base: '.'})
        .pipe(gulpPlugins.sourcemaps.init())
	    .pipe(gulpPlugins.concat('all.js'))
        .pipe(gulpPlugins.sourcemaps.write('.'))
        .pipe(gulp.dest(SETTINGS.build.js))
        .pipe(gulpPlugins.filter(['!**/*.js.map']))
        .pipe(gulpPlugins.ngAnnotate())
	    .pipe(gulpPlugins.uglify())
        .pipe(gulpPlugins.concat('all.min.js'))
        .pipe(gulp.dest(SETTINGS.build.js))

});


gulp.task('concat:css', function () {

    var mapsFilter = gulpPlugins.filter(['!**/*.js.map', '!**/*.css.map']);

    // Callback to show sass error
    var showError = function (err) {
        console.log(errorLog('\n SASS file has error clear it to see changes, see below log ------------->>> \n'));
        console.log(errorLog(err));
    };

	console.log('-------------------------------------------------- CONCAT :css ');

    return gulpPlugins.merge(
        gulp.src([SETTINGS.src.css + 'fonts.css', SETTINGS.src.css + '*.css'], {base: '.'})
            .pipe(gulpPlugins.sourcemaps.init()),
        gulp.src(SETTINGS.src.css + 'application.scss', {base: '.'})
            .pipe(gulpPlugins.sourcemaps.init())
            .pipe(gulpPlugins.sass({includePaths: [SETTINGS.src.css], onError: showError}))
    )
        .pipe(gulpPlugins.sourcemaps.init())
        .pipe(gulpPlugins.concat('styles.css'))
        .pipe(gulpPlugins.sourcemaps.write('.'))
        .pipe(gulp.dest(SETTINGS.build.css))
        .pipe(gulpPlugins.filter(['!**/*.css.map']))
        .pipe(gulpPlugins.minifyCss({keepSpecialComments: '*'}))
        .pipe(gulpPlugins.concat('styles.min.css'))
        .pipe(gulp.dest(SETTINGS.build.css))
        ;
});


/*============================================================
=                          Minify				            =
============================================================*/

gulp.task('image:min', function () {
	return gulp.src(SETTINGS.src.images + '**')
        .pipe(gulpPlugins.imagemin())
        .pipe(gulp.dest(SETTINGS.build.images));
});


/*============================================================
=                           Copy                            =
============================================================*/

gulp.task('copy', ['copy:html', 'copy:images', 'copy:fonts']);


gulp.task('copy:html', function () {

	console.log('-------------------------------------------------- COPY :html');
	return gulp.src([SETTINGS.src.templates + '*.html', SETTINGS.src.templates + '**/*.html'])
		.pipe(gulp.dest(SETTINGS.build.templates))
        .pipe(gulpPlugins.minifyHtml({comments: false, quotes: true, spare: true, empty: true, cdata: true}))
        .pipe(gulpPlugins.angularTemplatecache('templates.js', {module: SETTINGS.build.templatesModule, root: SETTINGS.build.templatesBase}))
        .pipe(gulp.dest(SETTINGS.build.templates))

    ;
});


gulp.task('copy:images', function () {

	console.log('-------------------------------------------------- COPY :images');
    return gulp.src([SETTINGS.src.images + '*.*', SETTINGS.src.images + '**/*.*'])
		.pipe(gulp.dest(SETTINGS.build.images));
});

gulp.task('copy:fonts', function () {

	console.log('-------------------------------------------------- COPY :fonts');
    return gulp.src([SETTINGS.src.fonts + '*', SETTINGS.src.fonts + '**/*'])
		.pipe(gulp.dest(SETTINGS.build.fonts));
});


/*=========================================================================================================
=												Watch

	Incase the watch fails due to limited number of watches available on your sysmtem, the execute this
	command on terminal

	$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
=========================================================================================================*/

gulp.task('watch_files', function () {

	console.log('watching all the files.....');

	var watchedFiles = [];

	watchedFiles.push(gulp.watch([SETTINGS.src.css + '*.css',  SETTINGS.src.css + '**/*.css'],  ['concat:css']));

	watchedFiles.push(gulp.watch([SETTINGS.src.css + '*.scss', SETTINGS.src.css + '**/*.scss'], ['concat:css']));

    watchedFiles.push(gulp.watch([SETTINGS.src.js + '*.js',    SETTINGS.src.js + '**/*.js'],    ['concat:js']));

	watchedFiles.push(gulp.watch([SETTINGS.src.images + '*.*', SETTINGS.src.images + '**/*.*'], ['copy:images']));

	watchedFiles.push(gulp.watch([SETTINGS.src.fonts + '*.*',  SETTINGS.src.fonts + '**/*.*'],  ['copy:fonts']));

	watchedFiles.push(gulp.watch([SETTINGS.src.bower + '*.js', SETTINGS.src.bower + '**/*.js'], ['concat:bower']));

	watchedFiles.push(gulp.watch([SETTINGS.src.templates + '*.html', SETTINGS.src.templates + '**/*.html'], ['copy:html']));


	// Just to add log messages on Terminal, in case any file is changed
	var onChange = function (event) {
		if (event.type === 'deleted') {
			runSequence('clean');
			setTimeout(function () {
				runSequence('copy', 'concat');
			}, 500);
		}
		console.log(changeLog('-------------------------------------------------->>>> File ' + event.path + ' was ------->>>> ' + event.type));
	};

	watchedFiles.forEach(function (watchedFile) {
		watchedFile.on('change', onChange);
	});

});


/*============================================================
=                             Clean                          =
============================================================*/

var cleanFiles = function (files, logMessage) {
	console.log('-------------------------------------------------- CLEAN :' + logMessage);
	gulp.src(files, {read: false})
		.pipe(gulpPlugins.rimraf({force: true}));
};

gulp.task('clean', function () {
	cleanFiles([SETTINGS.build.app], 'all files');
});

gulp.task('clean:css', function () {
	cleanFiles([SETTINGS.build.css], 'css');
});

gulp.task('clean:js', function () {
	cleanFiles([SETTINGS.build.js], 'js');
});

gulp.task('clean:html', function () {
	cleanFiles([SETTINGS.build.templates], 'html');
});

gulp.task('clean:images', function () {
	cleanFiles([SETTINGS.build.images], 'images');
});

gulp.task('clean:fonts', function () {
	cleanFiles([SETTINGS.build.fonts + '*.*', SETTINGS.build.fonts + '**/*.*'], 'fonts');
});


/*============================================================
 =                       Browser Sync                         =
 ============================================================*/
gulp.task('reload_css', function() {

    return gulp.src([SETTINGS.build.css + '*css', SETTINGS.build.bower + '*css']).pipe(reload({stream: true}));
});

gulp.task('bs', function () {

    var bs = browserSync.init({
        proxy: args.proxy,
        host: args.host,
        https: !!args.https
    });

    gulp.watch([
        SETTINGS.src.twigTemplate,
        SETTINGS.build.templates + '*.html',
        SETTINGS.build.js + '*.js',
        SETTINGS.build.bower + '*.js'
    ]).on('change', reload);

    gulp.watch([SETTINGS.build.css + '*css', SETTINGS.build.bower + '*css'], ['reload_css']);

});

/*============================================================
=                             Start                          =
============================================================*/


gulp.task('build', function () {
	console.log(hintLog('-------------------------------------------------- BUILD'));
	runSequence('copy', 'concat');
});

gulp.task('default', ['build']);

gulp.task('watch', ['build', 'bs', 'watch_files']);



var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    streamqueue = require('streamqueue');

var paths = {
    // Scripts Required to Run the default app
    appScripts: ['bower_components/codemirror/lib/codemirror.js', 
                 'bower_components/codemirror/addon/runmode/runmode.js',
                 'bower_components/codemirror/mode/python/python.js'], 

    // Styles needed for Run the default app
    appStyles: ['styles/foundation.css',
                'styles/add-ons.css',
                'bower_components/codemirror/lib/codemirror.css',
                'bower_components/theme/base-16-light.css'],
    // CodeMirror Modes
    altScripts: [],     
    // CodeMirror Themes
    altStyles: []      
};

// Handle the core applications scripts
gulp.task('app_scripts', function(){
    var stream = streamqueue({objectMode: true});
    for (var i=0; i < paths.appScripts.length; i++) {
        stream.queue(gulp.src(paths.appScripts[i]));
    };
    return stream.done()
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('build/js'));
});

// Handle the core styles for the default application
gulp.task('app_styles', function() {
    var stream = streamqueue({objectMode: true});
    for (var i=0; i < paths.appStyles.length; i++) {
        stream.queue(gulp.src(paths.appStyles[i]));
    };
    return stream.done()
        .pipe(minifycss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('clean', function() {
  return gulp.src(['build/css', 'build/js'], {read: false})
    .pipe(clean());
});

// Run these when gulp is run on command line
gulp.task('default', ['clean'], function() {
    gulp.start('app_scripts', 'app_styles');
});
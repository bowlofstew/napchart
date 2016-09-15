var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

var sassFiles = ['./sass/**/*.scss'];
var jsFiles = [
    './js/core/helpers.js',
    './js/core/core.js',
    './js/**/**.js'
];

var onError = function (err) {
    gutil.log(gutil.colors.red("ERROR", 'taskName'), err);
    this.emit("end", new gutil.PluginError('taskName', err, { showStack: true }));
  };

gulp.task('default', ['watch']);

gulp.task('watch', ['sass', 'js'], function(cb){
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFiles, ['js']);
})

gulp.task('sass', function(done) {
    gulp.src('./sass/**.scss')
    .pipe(sass({ errLogToConsole: true}).on('error', onError))
    .pipe(sourcemaps.init())
    //.pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))

    .on('end', done)
});

gulp.task('js', function(done) {
    gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
        .pipe(concat('napchart.min.js'))
        .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'))
    .on('end', done)
});

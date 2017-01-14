var gulp = require('gulp'),
	sass = require('gulp-sass'),
	csso = require('gulp-csso'),
	browserSync = require('browser-sync').create(),
	jsmin = require('gulp-jsmin'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	tinypng = require('gulp-tinypng'),
	clean = require('gulp-clean'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('tinypng', function () {
    gulp.src('no-comp/*.*')
        .pipe(tinypng('LOS6_ciVHxNcie7NPlwd-xl_vm067sfm'))
        .pipe(gulp.dest('app/img/'));
});
gulp.task('clean', function () {
    return gulp.src('no-comp/*', {read: false})
        .pipe(clean());
});

gulp.task('sass', function () {
  return gulp.src('./app/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    	browsers: ['last 10 versions'],
    	cascade: false
    }))
    .pipe(gulp.dest('./app/css'));
});
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/css/*.css").on('change', browserSync.reload);
    gulp.watch("app/**/*.js").on('change', browserSync.reload);
});
gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', jsmin()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('build'));
});
gulp.task('watch',function(){
	gulp.watch("./app/*.sass",['sass']);
});
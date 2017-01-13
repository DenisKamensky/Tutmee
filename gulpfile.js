var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	csso = require('gulp-csso'),
	browserSync = require('browser-sync').create(),
	jsmin = require('gulp-jsmin'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	tinypng = require('gulp-tinypng'),
	clean = require('gulp-clean'),
	autoprefixer = require('gulp-autoprefixer'),
	decl = {
		block:	[
					'common',
					'header',
					'menu-trigger',
					'logo', 
					'link',
					'menu',
					'access'
		],
		mediaBlock: [
			'common',
			'access',
			'navigation-container',
			'menu',
			'header-menu',
			'menu-trigger'
		]
	};

gulp.task('tinypng', function () {
    gulp.src('no-comp/*.*')
        .pipe(tinypng('LOS6_ciVHxNcie7NPlwd-xl_vm067sfm'))
        .pipe(gulp.dest('app/img/'));
});
gulp.task('clean', function () {
    return gulp.src('no-comp/*', {read: false})
        .pipe(clean());
});
gulp.task('styleBuild',function(){
	return gulp.src(
		decl.block.map(function(path){
			var link = './app/blocks/'+path+'/'+path+'.sass';
			return link;
		})
	).pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    	browsers: ['last 10 versions'],
    	cascade: false
    })).pipe(concat('main.css'))
    .pipe(gulp.dest('./app/css')); 
});
gulp.task('styleBuildMedia',function(){
	return gulp.src(
		decl.mediaBlock.map(function(path){
			var link = './app/blocks/'+path+'/media/'+path+'.media.sass';
			return link;
		})
	).pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    	browsers: ['last 10 versions'],
    	cascade: false
    })).pipe(concat('media.css'))
    .pipe(gulp.dest('./app/css')); 
});
gulp.task('bem', function () {
	gulp.watch('./app/blocks/**/*.sass',['styleBuild','styleBuildMedia']);
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
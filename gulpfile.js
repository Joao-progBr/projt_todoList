const gulp = require('gulp')
const uglify = require('gulp-uglify')
const less = require('gulp-less')
const cleanCss = require('gulp-clean-css')
const replace = require('gulp-replace')

function moveHtml(){
    return gulp.src('./src/index.html')
    .pipe(replace('./style/style.less', './style/style.css'))
    .pipe(gulp.dest('./dist/'))
}

function compLess(){
    return gulp.src('./src/style/*.less')
    .pipe(less())
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/style/'))
}

function minJs(){
    return gulp.src('./src/script/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/script/'))
}

exports.default = gulp.parallel(compLess, minJs, moveHtml)
exports.watch = function(){
    gulp.watch('./src/style/*.less', gulp.parallel(compLess))
    gulp.watch('./src/script/*.js', gulp.parallel(minJs))
}
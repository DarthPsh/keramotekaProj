const gulp = require('gulp');

// Копируем из папки dev в dist

module.exports = function video() {
    return gulp.src('dev/static/ajax/*.*')
        .pipe(gulp.dest('dist/static/ajax'))
};
const gulp = require('gulp');

// Копируем все pdf'ки из папки dev в dist

module.exports = function video() {
    return gulp.src('dev/static/pdf/*.*')
        .pipe(gulp.dest('dist/static/pdf'))
};
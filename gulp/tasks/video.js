const gulp = require('gulp');

// Копируем всё видео из папки dev в dist

module.exports = function video() {
    return gulp.src('dev/static/video/*.*')
        .pipe(gulp.dest('dist/static/video'))
};
const gulp = require('gulp');
const concat = require('gulp-concat');

const vendorsScripts = [
  // 'dev/static/js/vendor/jquery-3.3.1.min.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/lozad/dist/lozad.min.js',
  'node_modules/swiper/swiper-bundle.min.js',
  'node_modules/jquery-validation/dist/jquery.validate.min.js',
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
  'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
  'dev/static/js/vendor/directive.js'
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp.src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/static/js/'))
    : cb();
};

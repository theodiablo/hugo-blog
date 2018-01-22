var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var $ = require('gulp-load-plugins')();
var responsive = require('gulp-responsive');

gulp.task('minify', minifyHtml);
gulp.task('images', minifyHtml);

function minifyHtml() {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
}

/*
<img
  sizes="(min-width: 40em) 80vw, 100vw"
  srcset="examples/images/image-medium.jpg 375w,
          examples/images/image-large.jpg 480w,
          examples/images/image-extralarge.jpg 768w"
  alt="…">
*/

function responsiveImg() {
  return gulp.src('public/images/*.{jpg,png}')
    .pipe($.responsive({
      // Convert all images to JPEG format
      '*': [{
        // image-medium.jpg is 375 pixels wide
        width: 375,
        rename: {
          suffix: '-medium',
          extname: '.jpg',
        },
      }, {
        // image-large.jpg is 480 pixels wide
        width: 480,
        rename: {
          suffix: '-large',
          extname: '.jpg',
        },
      }, {
        // image-extralarge.jpg is 768 pixels wide
        width: 768,
        rename: {
          suffix: '-extralarge',
          extname: '.jpg',
        },
      }],
    }))
    .pipe(gulp.dest('dist'));
};
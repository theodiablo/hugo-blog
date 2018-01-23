var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var $ = require('gulp-load-plugins')();
var responsive = require('gulp-responsive');
var runSequence = require('run-sequence');

gulp.task('build', gulp.series(minifyHtml, responsiveImg));

gulp.task('html', minifyHtml);
gulp.task('images', responsiveImg);

function minifyHtml() {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
}


function responsiveImg() {
  return gulp.src(['public/images/posts/**/*.jpg'])
    .pipe($.responsive({
      // Convert all images to JPEG format
      '**/*': [{
        // image-medium.jpg is 400 pixels wide
        width: 500,
        withoutEnlargement: false,
        rename: {
          suffix: '-medium',
          extname: '.jpg'
        },
      }, {
        // image-large.jpg is 800 pixels wide
        width: 800,
        withoutEnlargement: false,
        rename: {
          suffix: '-large',
          extname: '.jpg'
        },
      }, {
        // image-extralarge.jpg is 1400 pixels wide
        width: 1400,
        withoutEnlargement: false,
        rename: {
          suffix: '-extralarge',
          extname: '.jpg'
        },
      }, 
      //2x for retina displays
      {
        // image-medium.jpg is 400 pixels wide
        width: 500 * 2,
        withoutEnlargement: false,
        rename: {
          suffix: '-medium@2x',
          extname: '.jpg'
        },
      }, {
        // image-large.jpg is 800 pixels wide
        width: 800 * 2,
        withoutEnlargement: false,
        rename: {
          suffix: '-large@2x',
          extname: '.jpg'
        },
      }, {
        // image-extralarge.jpg is 1400 pixels wide
        width: 1400 * 2,
        withoutEnlargement: false,
        rename: {
          suffix: '-extralarge@2x',
          extname: '.jpg'
        },
      }]
    },
      {
	      // global quality for all images
	      quality: 75,
	      errorOnUnusedImage: false
    }))
    .pipe(gulp.dest('public/images/generated/posts'));
};
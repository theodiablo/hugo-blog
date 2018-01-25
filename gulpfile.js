var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var $ = require('gulp-load-plugins')();
var responsive = require('gulp-responsive');
var runSequence = require('run-sequence');
var newer = require('gulp-newer');

gulp.task('build', gulp.series(minifyHtml));

gulp.task('html', minifyHtml);
gulp.task('images', responsiveImg);

var imageSrc = 'static/images/posts/**/*.jpg';
var imageDest = 'static/images/generated/posts';

function minifyHtml() {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
}


function responsiveImg() {
  return gulp.src(imageSrc)
    .pipe(newer({dest: imageDest, ext: "-medium.jpg"}))
    .pipe($.responsive({
      // Convert all images to JPEG format
      '**/*': [{
        // image-micro.jpg is 20 pixels wide
        width: 20,
        withoutEnlargement: false,
        quality: 50,
        rename: {
          suffix: '-micro',
          extname: '.jpg'
        },
      },
      {
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
	      errorOnUnusedImage: false,
        errorOnUnusedConfig: false
    }))
    .pipe(gulp.dest(imageDest));
};
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var $ = require('gulp-load-plugins')();
var responsive = require('gulp-responsive');
var runSequence = require('run-sequence');
var newer = require('gulp-newer');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');

 
gulp.task('pre-build', gulp.series(responsiveImg, minifyJs));

gulp.task('build', gulp.series(minifyHtml));

gulp.task('html', minifyHtml);
gulp.task('images', responsiveImg);
gulp.task('javascript', minifyJs);

var websiteUrl="//traveling-bubbles.com/";
var imageSrc = 'static/images/posts/**/*.jpg';
var imageDest = 'static/images/generated/posts';

var jsSrc = "static/js/*.js";
var jsDest = "static/js/generated";
var jsDestFile = 'all.min.js';

var htmlSrc = 'public/**/*.html';

function minifyHtml() {
  return gulp.src(htmlSrc)
    /*.pipe(htmlreplace({js: {src: websiteUrl + "js/generated/" + jsDestFile, tpl: '<script src="%s" async></script>'}}, {
  keepUnassigned: false,
  keepBlockTags: false,
  resolvePaths: false
}))*/
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
}

function minifyJs () {
  return  gulp.src(jsSrc)
    .pipe(newer({dest: jsDest + "/" + jsDestFile }))
    .pipe(concat(jsDestFile))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
}

function responsiveImg() {
  return gulp.src(imageSrc)
    .pipe(newer({dest: imageDest, ext: "-medium.jpg"}))
    .pipe($.responsive({
      // Convert all images to JPEG format
      '**/*': [{
        // image-micro.jpg is 20 pixels wide
        width: 60,
        withoutEnlargement: false,
        quality: 50,
        rename: {
          suffix: '-micro',
          extname: '.jpg'
        },
      },{
        // image-smal.jpg is 300 pixels wide
        width: 300,
        withoutEnlargement: false,
        rename: {
          suffix: '-small',
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
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');
const gulpIf = require('gulp-if');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const bulkSass = require('gulp-sass-bulk-import');
const rename = require('gulp-rename');

const isDebug = process.env.NODE_ENV !== 'production';

/* eslint-disable global-require */
gulp.task('styles', () => (
  gulp.src('app/styles/*.scss')
    .pipe(plumber({ errorHandler: errorHandler('Error in styles task') }))
    .pipe(gulpIf(isDebug, sourcemaps.init()))
    .pipe(bulkSass())
    .pipe(sass())
    .pipe(postcss([
      require('autoprefixer'),
      require('postcss-autoreset')({
        reset: {
          all: 'initial',
          'font-family': 'inherit',
          'font-size': 'inherit',
        },
      }),
      require('postcss-initial'),
      require('postcss-center'),
      require('postcss-clearfix'),
      require('postcss-discard-comments'),
      require('postcss-size'),
      require('css-mqpacker'),
      !isDebug ? require('cssnano')({ zIndex: false }) : f => f,
    ]))
    .pipe(gulpIf(isDebug, sourcemaps.write()))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/assets/styles'))
));
/* eslint-enable global-require */
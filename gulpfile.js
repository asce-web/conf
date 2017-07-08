var gulp = require('gulp')
var pug = require('gulp-pug')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var clean_css = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')

var Color = require('csscolor').Color
var Util       = require('neo').Util
var ConfSite   = require('neo').ConfSite
var ConfPage   = require('neo').ConfPage
var Conference = require('neo').Conference

gulp.task('pug:index', function () {
  return gulp.src('index.pug')
    .pipe(pug({
      basedir: './',
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('pug:default', function () {
  return gulp.src('sites/default/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Util: Util,
        site: new ConfSite()
          .colors(Color.fromString('#660000'), Color.fromString('#ff6600')) // default Hokie colors
          .init()
          .addConference('sample', new Conference({
            start_date: new Date(),
            end_date  : new Date(),
          }))
          .currentConference('sample')
          .prevConference('sample')
          .nextConference('sample'),
        page: new ConfPage(),
      },
    }))
    .pipe(gulp.dest('./sites/default/'))
})

gulp.task('pug:sample', function () {
  return gulp.src('sites/asce-event.org/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Util: Util,
        site: require('./sites/asce-event.org/data.js'),
      },
    }))
    .pipe(gulp.dest('./sites/asce-event.org/'))
})

gulp.task('pug:all', ['pug:index', 'pug:default', 'pug:sample'])

gulp.task('lessc:sample', function () {
  return gulp.src('sites/asce-event.org/styles/site.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./sites/asce-event.org/styles/'))
})

gulp.task('minify:sample', ['lessc:sample'], function () {
  return gulp.src('sites/asce-event.org/styles/site.css')
    .pipe(sourcemaps.init())
    .pipe(clean_css())
    .pipe(sourcemaps.write('./')) // write to an external .map file
    .pipe(gulp.dest('./sites/asce-event.org/styles/'))
})

gulp.task('build', ['pug:all', 'minify:sample'])

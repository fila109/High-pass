const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
  return del([
    'dist',
    'build'
  ])
}

const styles1 = () => {
  return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(concatCss('css/style.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const styles2 = () => {
  return src('src/css/**/*.css')
    .pipe(concat('main.css'))
    .pipe(concatCss('css/style.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('build'))
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('build'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/image/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/image'))
    .pipe(dest('build/image'))
}

const images = () => {
  return src([
    'src/image/**/*.jpg',
    'src/image/**/*.jpeg',
    'src/image/**/*.png',
    'src/image/*.svg'
    ])
    .pipe(image())
    .pipe(dest('dist/image'))
    .pipe(dest('build/image'))
}

const scripts1 = () => {
  return src([
      'src/js/script.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets:['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scripts2 = () => {
  return src([
    'src/js/script.js'
  ])
    .pipe(babel({
      presets:['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('build'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/css/**/*.css', styles1)
watch('src/css/**/*.css', styles2)
watch('src/image/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts1)
watch('src/js/**/*.js', scripts2)

exports.styles = styles1
exports.styles = styles2
exports.scripts = scripts1
exports.scripts = scripts2
exports.htmlMinify = htmlMinify
exports.default = series(clean, htmlMinify, scripts1, scripts2, styles1, styles2, images, svgSprites, watchFiles)

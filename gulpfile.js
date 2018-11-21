const fs = require('fs')
const gulp = require('gulp')
const path = require('path')
const sass = require('gulp-sass')
const gutil = require('gulp-util')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const minify = require('gulp-babel-minify')

let watchConfig = {}

try {
  watchConfig = require(path.resolve(__dirname, 'config/watch.json'))
} catch {
  console.warn('watch.json configuration is missing')
}

function parseWatchConfig(config, targetFormat) {
  const output = []

  Object.keys(config).forEach(format => {
    if (targetFormat === format) {
      const bundles = config[format]

      const options = {
        minify: Boolean(bundles.minimize),
        sourcemap: Boolean(bundles.sourcemap)
      }

      output.push(...Object.keys(bundles)
        .filter(name => bundles[name] instanceof Array)
        .map(name => ({
          name,
          options,
          entries: bundles[name]
        })))
    }
  })

  return output
}

const jsConfig = parseWatchConfig(watchConfig, 'js')
const scssConfig = parseWatchConfig(watchConfig, 'scss')

gulp.task('scss', callback => {
  scssConfig.forEach(bundle => {
    const scssFiles = bundle.entries
      .map(file => path.resolve(__dirname, file))

    const cssFile = path.resolve(__dirname, bundle.name).split('/')
    const cssFilename = cssFile.pop()
    const cssFilePath = cssFile.join('/')

    if (fs.existsSync(cssFile)) {
      fs.unlinkSync(cssFile)
    }

    let pipe = gulp.src(scssFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(concat(cssFilename))

    if (bundle.options.minify) {
      pipe = pipe.pipe(cleanCSS({
        compatibility: 'ie11'
      }))
    }

    pipe.pipe(gulp.dest(cssFilePath))
  })

  callback()
})

gulp.task('js', callback => {
  jsConfig.forEach(bundle => {
    const jsFiles = bundle.entries
      .map(file => path.resolve(__dirname, file))

    const jsFile = path.resolve(__dirname, bundle.name).split('/')
    const jsFilename = jsFile.pop()
    const jsFilePath = jsFile.join('/')

    if (fs.existsSync(jsFile)) {
      fs.unlinkSync(jsFile)
    }

    let pipe = gulp.src(jsFiles)
      .pipe(babel({ presets: ['@babel/env'] }))
      .pipe(concat(jsFilename))

    if (bundle.options.minify) {
      pipe = pipe.pipe(minify({
        mangle: {
          keepClassName: true
        }
      }))
    }

    pipe.pipe(gulp.dest(jsFilePath))
  })

  callback()
})

gulp.task('watch', _ => {

  const extractFiles = bundles => bundles
    .map(bundle => bundle.entries)
    .reduce((arr, curr) => [...curr, ...arr], [])
    .map(file => path.resolve(__dirname, file))

  const scssFiles = extractFiles([...parseWatchConfig(watchConfig, 'scss')])

  gulp.watch(scssFiles, ['scss'])
})

gulp.task('default', _ => ['scss', 'js']
  .map(task => gulp.start(task)))

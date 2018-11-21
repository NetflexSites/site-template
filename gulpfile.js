const fs = require('fs')
const gulp = require('gulp')
const path = require('path')
const sass = require('gulp-sass')
const gutil = require('gulp-util')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')

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


gulp.task('watch', _ => {

  const extractFiles = bundles => bundles
    .map(bundle => bundle.entries)
    .reduce((arr, curr) => [...curr, ...arr], [])
    .map(file => path.resolve(__dirname, file))

  const scssFiles = extractFiles([...parseWatchConfig(watchConfig, 'scss')])

  gulp.watch(scssFiles, ['scss'])
})

gulp.task('default', _ => ['scss']
  .map(task => gulp.start(task)))

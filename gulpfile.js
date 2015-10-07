var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    argv = require('yargs').argv,
    preprocess = require('gulp-preprocess'),
    shell = require('gulp-shell')

gulp.task('default', ['images:watch', 'html:watch'], function() {
  new webpackDevServer(webpack(config), {
    contentBase: config.output.path,
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  }).listen(config.port, 'localhost', function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log('Listening at localhost:' + config.port)
  })
})

gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(preprocess({context: { NODE_ENV: argv.production ? 'production' : 'development'}}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('html:watch', ['html'], function() {
  gulp.watch('./src/*.html', ['html'])
})

gulp.task('images', function() {
  gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('./dist/assets/images'))
})

gulp.task('images:watch', ['images'], function() {
  gulp.watch('./src/assets/images/*/**', ['images'])
})

gulp.task('build', ['html', 'images'], function() {
  return gulp.src('')
    .pipe(shell([
      'NODE_ENV=production webpack'
    ]))
})
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('transpile-core', () => {
  return gulp.src(['src/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('transpile-gdax', () => {
  return gulp.src(['src/GDAX/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/GDAX/'));
});

gulp.task('transpile-slack', () => {
  return gulp.src(['src/Slack/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/Slack/'));
});

gulp.task('transpile-cmc', () => {
  return gulp.src(['src/CoinMarketCap/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/CoinMarketCap/'));
});

gulp.task('babel-core', () => {
  return gulp.watch(['src/*.js'], ['transpile-core']);
});

gulp.task('babel-gdax', () => {
  return gulp.watch(['src/GDAX/*.js'], ['transpile-gdax']);
});

gulp.task('babel-slack', () => {
  return gulp.watch(['src/Slack/*.js'], ['transpile-slack']);
});

gulp.task('babel-cmc', () => {
  return gulp.watch(['src/CoinMarketCap/*.js'], ['transpile-cmc']);
});

gulp.task('default', [
  'transpile-core',
  'transpile-gdax',
  'transpile-slack',
  'transpile-cmc',
  'babel-core',
  'babel-gdax',
  'babel-slack',
  'babel-cmc'
]);

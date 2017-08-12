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

gulp.task('transpile-bittrex', () => {
  return gulp.src(['src/Bittrex/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/Bittrex/'));
});

gulp.task('transpile-intrinio', () => {
  return gulp.src(['src/Intrinio/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/Intrinio/'));
});

gulp.task('transpile-models', () => {
  return gulp.src(['src/models/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/models/'));
});

gulp.task('transpile-kraken', () => {
  return gulp.src(['src/Kraken/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/Kraken/'));
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

gulp.task('babel-bittrex', () => {
  return gulp.watch(['src/Bittrex/*.js'], ['transpile-bittrex']);
});

gulp.task('babel-intrinio', () => {
  return gulp.watch(['src/Intrinio/*.js'], ['transpile-intrinio']);
});

gulp.task('babel-models', () => {
  return gulp.watch(['src/models/*.js'], ['transpile-models']);
});

gulp.task('babel-kraken', () => {
  return gulp.watch(['src/Kraken/*.js'], ['transpile-kraken']);
});

gulp.task('default', [
  'transpile-core',
  'transpile-gdax',
  'transpile-slack',
  'transpile-cmc',
  'transpile-bittrex',
  'transpile-intrinio',
  'transpile-models',
  'transpile-kraken',
  'babel-core',
  'babel-gdax',
  'babel-slack',
  'babel-cmc',
  'babel-bittrex',
  'babel-intrinio',
  'babel-models',
  'babel-kraken'
]);

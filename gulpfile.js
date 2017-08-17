const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('transpile-core', () => {
  return gulp.src(['src/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('transpile-slack', () => {
  return gulp.src(['src/Slack/*.js'])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./dist/Slack/'));
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

gulp.task('babel-core', () => {
  return gulp.watch(['src/*.js'], ['transpile-core']);
});

gulp.task('babel-slack', () => {
  return gulp.watch(['src/Slack/*.js'], ['transpile-slack']);
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

gulp.task('default', [
  'transpile-core',
  'transpile-slack',
  'transpile-bittrex',
  'transpile-intrinio',
  'transpile-models',
  'babel-core',
  'babel-slack',
  'babel-bittrex',
  'babel-intrinio',
  'babel-models',
]);

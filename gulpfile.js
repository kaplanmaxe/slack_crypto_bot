const gulp = require('gulp');
const babel = require('gulp-babel');

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

gulp.task('babel-gdax', () => {
  return gulp.watch(['src//GDAX/*.js'], ['transpile-gdax']);
});

gulp.task('babel-slack', () => {
  return gulp.watch(['src//Slack/*.js'], ['transpile-gdax']);
});

gulp.task('default', [
  'transpile-gdax',
  'transpile-slack',
  'babel-gdax',
  'babel-slack'
]);

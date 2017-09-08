import eslint from 'gulp-eslint';
import gulp from 'gulp';

gulp.task('eslint', () => gulp.src(['*.js'])
  .pipe(eslint({
    config: '.eslintrc.js',
    'max-warnings': 0,
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('eslint-fix', () => gulp.src(['*.js'])
  .pipe(eslint({
    config: '.eslintrc.js',
    fix: true,
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

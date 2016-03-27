const gulp = require('gulp');
const eslint = require('gulp-eslint');
const audiosprite = require('gulp-audiosprite');

const files = {
  javascript: ['**/*.js', '!public/phaser*.js', '!public/bundle.js', '!node_modules/**/*'],
};

gulp.task('eslint', () =>
  gulp.src(files.javascript)
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(gulp.dest('./'))
);

gulp.task('audiosprite', () =>
  gulp.src('./src/sounds/*.mp3')
    .pipe(audiosprite({
      samplerate: 32000,
      export: 'mp3',
    }))
    .pipe(gulp.dest('public/sounds'))
);

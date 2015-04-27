var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify   = require('watchify');

// http://viget.com/extend/gulp-browserify-starter-faq
// pretty dope: https://github.com/greypants/gulp-starter/tree/master/gulp/tasks

gulp.task('browserify', function() {
  return browserify('./src/app.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/'));
});

gulp.task('watchify', function () {
    var bundler = watchify(browserify('./src/app.js', {
          cache: {},
          packageCache: {},
          fullPaths: true,
          debug: true
      }));

    function rebundle() {
        return bundler.bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./build'));
    }
    bundler.on('update', rebundle);
    // run any other gulp.watch tasks
    return rebundle();
});


gulp.task('copy', function() {
    gulp.src('./src/*.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['watchify'], function(){
  gulp.watch('./src/*.html',  ['copy']);
});

// create a default task and just log a message
// gulp.task('default', function() {
//   return gutil.log('Gulp is running!')
// });

gulp.task('default', ['watch', 'copy']);

const gulp = require('gulp');
const babel = require('gulp-babel');


gulp.task('default', (done) => {
    gulp.src("es2024/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
    gulp.src("public/es2024/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist"));
    done();
    });

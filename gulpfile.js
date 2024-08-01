const gulp = require('gulp');
const babel = require('gulp-babel');
//
gulp.task('default', function(){
    gulp.src("es2024/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
    gulp.src("public/es2024/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist"));
    //
});
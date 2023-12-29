const gulp = require("gulp")
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


gulp.task("build", (done) => {
    gulp.src(["./js/rrweb.min.js", "./js/index.js"])
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./build"))
    done()
})
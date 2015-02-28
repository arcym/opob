var gulp = require("gulp")
var gulp_util = require("gulp-util")

var watchify = require("watchify")
var browserify = require("browserify")

var chalk = require("chalk")

var vinyl_buffer = require("vinyl-buffer")
var vinyl_source = require("vinyl-source-stream")

gulp.task("watch", function() {
    gulp.start([
        "watch:scripts"
    ])
})

gulp.task("watch:scripts", function() {
    var browserifying = watchify(browserify(watchify.args))
    browserifying.add("./source_files/index.js")
    browserifying.on("update", bundle)
    bundle()

    function bundle() {
        return browserifying.bundle()
            .pipe(vinyl_source("index.js"))
            .pipe(gulp.dest("./build_files"))
    }
})

gulp.task("default", ["watch"])

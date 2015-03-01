var gulp = require("gulp")
var gulp_if = require("gulp-if")
var gulp_util = require("gulp-util")
var gulp_sass = require("gulp-sass")
var gulp_watch = require("gulp-watch")
var gulp_uglify = require("gulp-uglify")
var gulp_minify_css = require("gulp-minify-css")
var gulp_minify_html = require("gulp-minify-html")
var gulp_prefixify_css = require("gulp-autoprefixer")
var gulp_json_transform = require("gulp-json-transform")

var watchify = require("watchify")
var browserify = require("browserify")
var reactify = require("reactify")
var envify = require("envify/custom")
var aliasify = require("aliasify")

var del = require("del")
var chalk = require("chalk")
var yargs = require("yargs")
var vinyl_buffer = require("vinyl-buffer")
var vinyl_source = require("vinyl-source-stream")

browserify = browserify(watchify.args)
    .add("./source_files/index.js")
    .transform("reactify")
    .transform(envify({
        devmode: yargs.argv.devmode
    }))
    .transform(aliasify.configure({
        configDir: __dirname,
        aliases: {
            "<source>": "./source_files",
            "<scripts>": "./source_files/scripts",
            "<styles>": "./source_files/styles",
            "<stuff>": "./source_files/stuff"
        }
    }))

gulp.task("default", function() {
    gulp.start(["build"])
})

gulp.task("build", function() {
    gulp.start([
        "build:scripts",
        "build:styles",
        "build:markup",
        "build:stuffs"
    ])
})

gulp.task("watch", function() {
    gulp.start([
        "watch:scripts",
        "watch:styles",
        "watch:markup",
        "watch:stuffs"
    ])
})

gulp.task("watch:scripts", function() {
    gulp.start("build:scripts")
    browserify = watchify(browserify).on("update", function() {
        gulp.start("build:scripts")
    })
})

gulp.task("watch:styles", function() {
    gulp.start("build:styles")
    gulp_watch("./source_files/**/*.scss", function() {
        gulp.start("build:styles")
    })
})

gulp.task("watch:markup", function() {
    gulp.start("build:markup")
    gulp_watch("./source_files/**/*.html", function() {
        gulp.start("build:markup")
    })
})

gulp.task("watch:stuffs", function() {
    gulp.start("build:stuffs")
    gulp_watch("./source_files/stuff/**/*", function() {
        gulp.start("build:stuffs")
    })
})

gulp.task("build:scripts", function() {
    browserify.bundle()
        .pipe(vinyl_source("index.js"))
        .pipe(vinyl_buffer())
        .pipe(gulp_if(yargs.argv.minify, gulp_uglify()))
        .pipe(gulp.dest("./build_files"))
})

gulp.task("build:styles", function() {
    gulp.src("./source_files/index.scss")
        .pipe(gulp_sass())
        .pipe(gulp_prefixify_css())
        .pipe(gulp_if(yargs.argv.minify, gulp_minify_css()))
        .pipe(gulp.dest("./build_files"))
})

gulp.task("build:markup", function() {
    gulp.src("./source_files/index.html")
        .pipe(gulp_if(yargs.argv.minify, gulp_minify_html()))
        .pipe(gulp.dest("./build_files"))
})

gulp.task("build:stuffs", function() {
    del("./build_files/stuff/**/*", function() {
        gulp.src("./source_files/stuff/**/*", {base: "./source_files"})
            .pipe(gulp.dest("./build_files"))
    })
})

process.on("uncaughtException", function (error) {
    console.log(chalk.red(error))
})

//todo: configs task
//      - gulp-json-transform
//todo: bump task
//      - gulp-prompt
//      - gulp-json-transform
//todo: deploy tasks?
//      - gulp-s3?
//      - gulp-gzip
//      - git subtree
//todo: image task
//      - gulp-imagemin
//      - gulp-cache
//todo: host task
//      - open
//      - gulp-connect?
//      - gulp-cache

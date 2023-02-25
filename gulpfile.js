
// importing required modules
const gulp = require("gulp");
const pug = require("gulp-pug");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const sass =require('gulp-sass')(require('sass'));
const auto = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const minify  = require("gulp-minify");
const babelify = require("babelify");
const browserify = require("browserify");
const rename = require("gulp-rename");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const eventStream = require("event-stream");

//stylesheet paths
let cssSRC="main.scss";
let cssFolder="./src/stylesheets/";
let cssDist="./dist/css/";
let cssFiles=[cssSRC];
let cssWatch={
    css:"./src/stylesheets/**/*.css",
    scss:"./src/stylesheets/**/*.scss"
};

//scripts paths
let  jsSRC="main.js";
let jsFolder="./src/js/";
let jsDist="./dist/js/";
let jsFiles=[jsSRC];
let jsWatch="./src/js/**/*.js";

// html paths
let htmlSRC="main.pug";
let htmlFolder="./src/html/";
let htmlDist="./dist/";
let htmlFiles=[htmlSRC];
let htmlWatch="./src/html/**/*.pug";

// loop:watch tasks
function loop_tasks(task,watchPath,entries){
    entries.forEach((entry)=>{
        gulp.watch(watchPath,gulp.series(`${task}_${entry}`));
    })

}

    /*
    **tasks defined functions
    */

//html task function
// function htmlTask(entry){
//     return gulp.src(htmlFolder + entry)
//         .pipe(pug({pretty: true}))
//         .pipe(gulp.dest(htmlDist));
// }

//style task function
// function styleTask(entry){
//     return  gulp.src(cssFolder + entry)
//         .pipe(sourcemaps.init())
//         .pipe(sass({
//             outputStyle :'compressed',
//             errorLogToConsole:true,
//         }))
//         .pipe(auto())
//         .on("error",console.error.bind(console))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(sourcemaps.write("./"))
//         .pipe(gulp.dest(cssDist));
// }

//script task function
// function scriptTask(entry){
//     return browserify({
//         entries: [jsFolder + entry]
//     }).transform(babelify, {
//         presets: ["env"]
//     }).bundle()
//         .pipe(source(entry))
//         .pipe(rename({extname: ".min.js"}))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(uglify())
//         .pipe(sourcemaps.write("./"))
//         .pipe(gulp.dest(jsDist));
// }

// html task
htmlFiles.map((entry)=> {
    gulp.task(`html_${entry}`,function(){
            return gulp.src(htmlFolder + entry)
                .pipe(pug({pretty: true}))
                .pipe(gulp.dest(htmlDist));
    });
});

// styles task
cssFiles.map((entry)=> {
    gulp.task(`style_${entry}`,function(){
        return  gulp.src(cssFolder + entry)
            .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle :'compressed',
                errorLogToConsole:true,
            }))
            .pipe(auto())
            .on("error",console.error.bind(console))
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(cssDist));
    });
});

// scripts task

jsFiles.map((entry)=> {
    gulp.task(`script_${entry}`,function(){
        return browserify({
            entries: [jsFolder + entry]
        }).transform(babelify, {
            presets: ["env"]
        }).bundle()
            .pipe(source(entry))
            .pipe(rename({extname: ".min.js"}))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(jsDist));
    });
});

// connect task
gulp.task("connect", ()=> {
    connect.server({
        root :"dist",
        livereload: true,
    })
})

// watch task
gulp.task('watch',()=>{
    loop_tasks("html",htmlWatch,htmlFiles);
    loop_tasks("style",cssWatch.scss,cssFiles);
    loop_tasks("style",cssWatch.css,cssFiles);
    loop_tasks("script",jsWatch,jsFiles);
});
//set gulp default tasks to connect and watch => livereload
gulp.task("default",gulp.parallel("watch","connect"));
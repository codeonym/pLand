
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

//stylesheet paths
let cssSRC="main.scss";
let cssFolder="src/stylesheets/";
let cssDist="./dist/css/";
let cssFiles=[cssSRC];
let cssWatch={
    css:"src/stylesheets/**/*.css",
    scss:"src/stylesheets/**/*.scss"
};

//scripts paths
let  jsSRC="main.js";
let jsFolder="src/js/";
let jsDist="./dist/js/";
let jsFiles=[jsSRC];
let jsWatch="src/js/**/*.js";

// html paths
let htmlSRC="main.pug";
let htmlFolder="src/html/";
let htmlDist="./dist/";
let htmlFiles=[htmlSRC];
let htmlWatch="src/html/**/*.pug";

// html task
gulp.task('html',()=> {
    htmlFiles.map((entry)=>{
       return gulp.src(htmlFolder + entry)
           .pipe(pug({pretty: true}))
           .pipe(gulp.dest(htmlDist));
    });
});

// css task
gulp.task("css", ()=>{
    cssFiles.map((entry)=>{
       return gulp.src(cssFolder + entry)
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
})

// scripts task
gulp.task("scripts", ()=>{
    jsFiles.map((entry)=>{
        return browserify({
            entries:[jsFolder + entry]
        }).transform(babelify,{
            presets:["env"]
        }).bundle()
        .pipe(source(entry))
        .pipe(rename({extname:".min.js"}))
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
gulp.task("watch", ()=>{
    //livereload everytime something changes in those paths
    gulp.watch(htmlWatch,gulp.series("html"));
    gulp.watch(cssWatch.css,gulp.series("css"));
    gulp.watch(cssWatch.scss,gulp.series("css"));
    gulp.watch(jsWatch,gulp.series("scripts"));
})

//set gulp default tasks to connect and watch => livereload
gulp.task('default', gulp.parallel('connect',"watch"));
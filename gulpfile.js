
// importing required modules
const gulp = require("gulp");
const pug = require("gulp-pug");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const sass =require('gulp-sass')(require('sass'));
const auto = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const minify  = require("gulp-minify");


// html task
gulp.task('html',()=> {
    // render .pug files to html file
    return gulp.src("./src/html/*.pug")
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        ;
});

// css task
gulp.task("css", ()=>{

    // render all stylesheets to css file
    return gulp.src(["./src/stylesheets/**/*.scss","./src/stylesheets/**/*.css"])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle :'compressed'}))
        .pipe(auto())
        .pipe(concat("main.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist/css"));
})

// scripts task
gulp.task("scripts", ()=>{

    // render scripts to js files
   return gulp.src("./src/js/*.js")
      // .pipe(minify())
       .pipe(gulp.dest("./dist/js"));
});
gulp.task("jsModules", ()=>{

    // render scripts to js files
    return gulp.src("./src/js/modules/*.mjs")
        .pipe(gulp.dest("./dist/js/modules"));
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
    gulp.watch(["./src/html/**/*.pug"],gulp.series("html"));
    gulp.watch("./src/stylesheets/**/**/*.css",gulp.series("css"));
    gulp.watch("./src/stylesheets/**/**/*.scss",gulp.series("css"));
    // gulp.watch("./src/stylesheets/*.scss",gulp.series("css"));
    gulp.watch("./src/js/**/*.js",gulp.series("jsModules"));
    gulp.watch("./src/js/**/*.js",gulp.series("scripts"));
})

//set gulp default tasks to connect and watch => livereload
gulp.task('default', gulp.parallel('connect',"watch"));
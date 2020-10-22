
let project_folder="dist";
let source_folder="#src";

let path={
    build:{
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/css/fonts/",
        php: project_folder + "/php/",
    },
    src:{
        html: source_folder + "/*.pug",
        css: source_folder + "/scss/*.{scss,css}",
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
        php: source_folder + "/php/**/*.php",
    },
    watch:{
        html: source_folder + "/**/*.pug",
        css: source_folder + "/scss/**/*.{scss,css}",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        php: source_folder + "/php/**/*.php",
    },
    clean: "./" + project_folder + "/"
}

let {src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries");
    pug = require("gulp-pug");
    
 
 function browserSync(params) {
     browsersync.init({
         server:{
             baseDir: "./" + project_folder + "/"
         },
         port:3000,
         notify: false
     })
 }


 function html() {
    return src(path.src.html)
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
 }

 function img() {
    return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
 }
 function php() {
    return src(path.src.php)
    .pipe(dest(path.build.php))
    .pipe(browsersync.stream())
 }
 function js() {
    return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
 }

 function fonts() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream())
 }

 function css(params) {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: "expanded"
        })
    )
    .pipe(
        group_media()
    )
    .pipe(
        autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
 }

 function clean(params) {
     return del(path.clean);
 }

 function watchFiles(params) {
     gulp.watch([path.watch.html], html);
     gulp.watch([path.watch.css], css);
     gulp.watch([path.watch.js], js);
     gulp.watch([path.watch.php], php);
     gulp.watch([path.watch.img], img);
 }

 let build = gulp.series(clean, gulp.parallel(js, fonts, php, img, css, html));
 let watch = gulp.parallel(build, watchFiles, browserSync);

 exports.js = js;
 exports.fonts = fonts;
 exports.img = img;
 exports.css = css;
 exports.html = html;
 exports.build = build;
 exports.watch = watch;
 exports.default = watch;
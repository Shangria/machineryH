const { src, dest, series, parallel, watch } = require('gulp');
// const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug-3');
const concat = require('gulp-concat');


function pugL(){
    return src('src/pages/*.pug')
        .pipe(
            pug({
                doctype: 'html',
                pretty: false
            })
        )
        .pipe(dest('docs'));
}


function css() {
    return src('src/css/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(rename('main.css'))
        .pipe(dest('docs/css'))
        .pipe(browserSync.stream());
}

function js() {
    return src(['src/js/components/**/*.js'])
        // .pipe(browserify({ transform: [babelify.configure({ presets: ['@babel/preset-env'] })] }))
        // .pipe(uglify({
        //     toplevel: true,
        //     compress: {drop_debugger: true}
        // }))
        .pipe(concat('main.bundle.js'))
        // .pipe(rename('main.bundle.js'))
        .pipe(dest('docs/js'))
        .pipe(browserSync.stream());
}

function jsLib() {
    return src(['src/js/lib/**/*.js'])
        // .pipe(browserify({ transform: [babelify.configure({ presets: ['@babel/preset-env'] })] }))
        .pipe(uglify({
            toplevel: true,
            compress: {drop_debugger: true}
        }))
        .pipe(concat('vendor.bundle.js'))
        .pipe(dest('docs/js'))
        .pipe(browserSync.stream());
}

function images() {
    return src('src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('docs/img'))
        .pipe(browserSync.stream());
}
function clean(){
    return del(['./docs/*']);
}
function dev(){
    browserSync.init({
        server: './docs'
    });
    watch('src/css/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/img/*', images);
    watch('src/pages/*', pugL);
}
function build(){
    return series(clean, parallel(js, jsLib, css), images, pugL);
}
exports.build = build();
exports.dev = series(clean, build(), dev);
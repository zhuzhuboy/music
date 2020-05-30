let {
    series,
    src,
    dest,
    watch
} = require('gulp')
const htmlClean = require('gulp-htmlclean');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssClean = require('gulp-clean-css');
const strip = require('gulp-strip-debug');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
let connect = require('gulp-connect');
let folder = {
    dev: 'src',
    prod: 'dist'
}
let devMod = process.env.NODE_ENV == 'development';

function html() {
    let page = src(folder.dev + '/html/*');
    if (devMod) {
        page.pipe(htmlClean())
    }

    page.pipe(connect.reload())
        .pipe(dest('dist/html/'))

    return page

}

function css() {
    let page = src(folder.dev + '/css/*')

        .pipe(less())
        .pipe(postcss([autoprefixer()]));
    if (devMod) {
        page.pipe(cssClean())
    }

    page.pipe(connect.reload())
        .pipe(dest('dist/css/'))
    return page

}

function js() {
    let page = src([`${folder.dev}/js/*`, `!${folder.dev}/js/*.min.js`])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }));
    if (devMod) {
        page.pipe(uglify())
            .pipe(strip())
    }

    page.pipe(connect.reload())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/js/'))
    return page

}

function zepto() {
    let page = src(`${folder.dev}/js/*.min.js`)
       
        .pipe(dest('dist/js/'))
    return page

}

function image() {
    return src(folder.dev + '/image/*')
        .pipe(imagemin())
        .pipe(dest('dist/image/'))

}

function server(cb) {
    connect.server({
        port: "1664",
        livereload: true
    })
    cb()
}

watch(folder.dev + '/html/*', function (cb) {
    html()
    cb()
})
watch(folder.dev + '/css/*', function (cb) {
    css()
    cb()
})
watch(folder.dev + '/js/*', function (cb) {
    js()
    zepto()
    cb()
})

exports.default = series(html, css, js, image, server, zepto);
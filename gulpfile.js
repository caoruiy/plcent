var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var del = require('del');
var pug = require('gulp-pug');
var concat = require('gulp-concat');


// 默认
gulp.task('default',['clean','images','fonts','after:portal','modules']);

// 清除
gulp.task('clean',function(cb){
	del([
		'./dist/css/',
		'./dist/js/',
		'./dist/tpl/',
		'./dist'
		],cb);
})
// task portal
gulp.task('portal', function(cb){
	// index.html
	gulp.src('./views/index.pug')
	.pipe(pug({pretty:true}))
	.pipe(usemin({
		css : [minify(),replace('/public/images','/images')],
		js : [uglify()]
	}))
	.pipe(replace(/\.\.\/modules\/(\w*?)\/(\w*?\.(js|css))/g,'./$3/$2')) // 修改引用模块内的css和js
	.pipe(replace(/\/tpl\/(\w*)\/(\w*)(?="|')/g,'./tpl/$2.html'))
	.pipe(replace('../public/stylesheets','./css'))
	.pipe(replace('../public/javascripts','./js'))
	.pipe(gulp.dest('./dist'))
	cb();
});
gulp.task('debug', function(cb){
	gulp.src('./public/javascripts/debug.js')
	.pipe(gulp.dest('./dist/js'));
	cb();
})

gulp.task('after:portal',['debug','portal'], function(cb){
	gulp.src(['./dist/js/debug.js', './dist/js/app.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./dist/js'));
	cb();
})

// 字体相关
gulp.task('fonts', function(cb){
	gulp.src('./bower_components/bootstrap/dist/fonts/*.*')
	.pipe(gulp.dest('./dist/fonts/'));
	cb();
})

// 图片相关
gulp.task('images', function(cb){
	gulp.src('./public/images/*.*')
	.pipe(gulp.dest('./dist/images/'));

	gulp.src('./favicon.ico')
	.pipe(gulp.dest('./dist/'));
	cb();
})

// 通用JS
// gulp.task('public', function(){
// 	gulp.src('./public/javascripts/*.js')
// 	// 匹配形如	: ../modules/dirname/filename.js  或者	: ../modules/dirname/filename.css
// 	// 替换成		: ./js/filename.js 或者		: ./css/filname.css
// 	.pipe(concat('app.js'))
// 	.pipe(replace(/\.\.\/modules\/(.*)\/(.*?\.(js|css))/g,'./$3/$2'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('./dist/js/'))
// })

// 各个模块
gulp.task('modules', function(cb){
	gulp.src('./modules/**/*.js')
	.pipe(rename({dirname:''}))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js/'))

	gulp.src('./modules/**/*.css')
	.pipe(rename({dirname:''}))
	.pipe(minify())
	.pipe(gulp.dest('./dist/css/'))

	// 压缩html
	var htmlOptions = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		minifyJS: true,//压缩页面JS
		minifyCSS: true//压缩页面CSS
	};

	gulp.src('./modules/**/*.pug')
	.pipe(rename({dirname:''}))
	.pipe(pug())
	.pipe(htmlmin(htmlOptions))
	.pipe(gulp.dest('./dist/tpl/'))
	cb();
})
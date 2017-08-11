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
var cdn = require('gulp-cdnizer');
var mainBowerFiles = require("main-bower-files");
var  filter = require('gulp-filter');

// 过滤文件
var filterByExtension = function(extension) {
	return filter(function(file) {
		return file.path.match(new RegExp('.' + extension + '$'));
	});
};

var cdnConfig = {
	defaultCDNBase: "//my.cdn.host/base",
	allowRev: true,
	allowMin: true,
	files: [
	"cdnjs:angular.js",
	"cdnjs:angular.js:angular-animate.js",
	"cdnjs:angular-ui-bootstrap",
	"cdnjs:angular-translate",
	"cdnjs:angular-translate-loader-static-files",
	{
		file : '/bower_components/angular-ui-router/release/angular-ui-router.js',
		cdn : '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.min.js'
	},
	{
		file : '/bower_components/oclazyload/dist/oclazyload.js',
		cdn : '//cdnjs.cloudflare.com/ajax/libs/oclazyload/1.1.0/ocLazyLoad.min.js'
	},
	{
		file : '/bower_components/normalize-css/normalize.css',
		cdn : '//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css'
	},
	{
		file : '/bower_components/bootstrap/dist/css/bootstrap.css',
		cdn : "//cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css"
	}

	]
};
// 默认
gulp.task('default',['buildAfter','last']);
gulp.task('build',['portal','debug']);
gulp.task('buildAfter',['build'])

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
gulp.task('portal',['images','fonts','modules'], function(cb){
	// index.html
	gulp.src('./views/index.pug')
	.pipe(pug({pretty:true}))
	.pipe(usemin({
		css : [minify(),replace('/public/images','/images')],
		js : [uglify()]
	}))
	.pipe(cdn(cdnConfig))
	.pipe(replace(/\.\.\/modules\/(\w*?)\/(\w*?\.(js|css))/g,'./$3/$2')) // 修改引用模块内的css和js
	.pipe(replace(/\/tpl\/(\w*)\/(\w*)(?="|')/g,'./tpl/$2.html'))
	.pipe(replace('../public/stylesheets','./css'))
	.pipe(replace('../public/javascripts','./js'))
	.pipe(gulp.dest('./dist'))
	cb();

});

gulp.task('debug', function(cb){
	gulp.src(['./public/javascripts/debug.js'])
	.pipe(gulp.dest('./dist/js'))
	cb();
})

gulp.task('last', function(cb){
	setTimeout(function(){
		gulp.src(['./dist/js/debug.js', './dist/js/app.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
		cb();
	},1000)
})

gulp.task('app', function(cb){
	gulp.src(['./public/javascripts/debug.js', './public/javascripts/app.js'])
	.pipe(concat('app.js'))
	.pipe(rename('app.back.js'))
	.pipe(gulp.dest('./dist/js'))
	.pipe(rename('app.js'))
	.pipe(gulp.dest('./dist/js'))
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

	// 网站图标
	gulp.src('./favicon.ico')
	.pipe(gulp.dest('./dist/'));
	cb();
})

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

// // 通用JS
// gulp.task('bower', function(){
// 	var jsFilter = filterByExtension('js'),
// 	cssFilter = filterByExtension('css');
// 	gulp.src(mainBowerFiles(),{base: './bower_components'})
// 	.pipe(rename({dirname:''}))
// 	.pipe(gulp.dest('./dist/libs'))
// 	.pipe(rename({suffix: '.min'}))
// 	.pipe(cssFilter)
// 	.pipe(minify())
// 	.pipe(gulp.dest('./dist/libs'))
// 	.pipe(jsFilter)
// 	.pipe(uglify())
// 	.pipe(gulp.dest('./dist/libs'));
// });
	// gulp.src([
	// 	'bower_components/angular/angular.min.js',
	// 	'bower_components/angular/angular.min.js',
	// 	'bower_components/angular-animate/angular-animate.min.js',
	// 	])
	// // 匹配形如	: ../modules/dirname/filename.js  或者	: ../modules/dirname/filename.css
	// // 替换成		: ./js/filename.js 或者		: ./css/filname.css
	// .pipe(concat('app.js'))
	// .pipe(replace(/\.\.\/modules\/(.*)\/(.*?\.(js|css))/g,'./$3/$2'))
	// .pipe(uglify())
	// .pipe(gulp.dest('./dist/js/'))
// })


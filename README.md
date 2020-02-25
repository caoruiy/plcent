### 该项目是www.plcent.com的主站项目
你可以访问 [http://www.plcent.com](http://www.plcent.com) 查看效果
### 使用工具
1. bower	进行包管理
2. gulp		自动化构建
3. express	本地服务

#### 项目框架
1. angular				基础框架
2. angular-ui-router	页面路由
3. angular-animate		页面动画
4. angular-translate	国际化支持
5. angular-bootstrap	常用指令库
6. oclazyload 			实现模块化加载

7. normalize-css		统一浏览器样式
8. bootstrap			样式库

### 目录结构
```
╔ bin
╠ bower_components
╠ dist 				打包好的项目
╠ modules 			各个模块
╠ node_modules
╠ public			公共js/css/img
╠ routes			express 路由
╠ views				页面视图
╠ .gitignore
╠ app.js 			
╠ bower.json
╠ favicon.ico
╠ gulpfile.js 		自动化构建
╠ package.json 		
╚ README.md
```
> 上述目录结构是使用express自动生成的目录结构，也是要express本地起的服务来开发项目
>
> 最后把 `views` 下，`public` 下以及 `modules` 下的文件打包到dist目录下

### something
1. 上线打包使用cdn代替本地访问

### build

> gulp build

### 访问
> cd ./projectDir

1. 安装依赖
> npm run init

2. 起服务
> npm start

3.访问
> [http://localhost:3000](http://localhost:3000)


4. 服务器上，只需要把 `dist` 目录设置成站点根目录即可

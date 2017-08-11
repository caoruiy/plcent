var app = angular.module('plcent',[
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'ngAnimate',
    'plcent.miniJquery',
    'plcent.popShow'
    ])
.value('isDebug',(typeof _IS_DEBUG === 'undefined'))
.config(['$translateProvider', function ($translateProvider) {
    // $translateProvider.useStaticFilesLoader({
    //     prefix: '../public/i18n/',
    //     suffix: '.json',
    // });
    var translations = {
        "Plcent" : "Plcent",
        "Home" : "主页",
        "Movie" : "电影",
        "Blog" : "博客",
        "GitHub" : "GitHub",
        "Language" : "语言",
        "caoruiy's personal site" : "caoruiy 的个人站点",
        "Contact me" : "和我联系",
        "ABOUT ME" :"关于我"
    };
    localStorage.lang = localStorage.lang || 'zh-cn';
    $translateProvider.translations('zh-cn', translations)
    $translateProvider.translations('en-us', {})
    $translateProvider.preferredLanguage(localStorage.lang);
    $translateProvider.useSanitizeValueStrategy('escape');
}])
.config(["$provide","$compileProvider","$controllerProvider","$filterProvider",function($provide,$compileProvider,$controllerProvider,$filterProvider){
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service  =$provide.service;
    app.constant = $provide.constant;
}])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    // 首页
    .state('index',{
        name:'index',
        url:'/',
        views : {
            "main" : {
                controller: 'indexCtrl',
                templateUrl: '/tpl/index/index'
            }
        },
        resolve: {
            deps:['$ocLazyLoad',function($ocLazyLoad) {
                $ocLazyLoad.load('../modules/index/index.css');
                return $ocLazyLoad.load('../modules/index/index.js');
            }],
        }
    })
    // 电影
    .state('movie',{
        name:'movie',
        url:'/movie',
        views : {
            "main" : {
                controller: 'movieCtrl',
                templateUrl: '/tpl/movie/movie'
            }
        },
        resolve: {
            deps:['$ocLazyLoad',function($ocLazyLoad) {
                $ocLazyLoad.load('../modules/movie/movie.css');
                return $ocLazyLoad.load('../modules/movie/movie.js');
            }],
        }

    })
    // 电影详情
    .state('movie.detail',{
        name:'movie.detail',
        url:'/detail/:id',
        views : {
            'detail' : {
                controller: 'movieDetailCtrl',
                templateUrl: '/tpl/movie/detail'
            }
        },
        resolve: {
            deps:['$ocLazyLoad',function($ocLazyLoad) {
                $ocLazyLoad.load('../modules/movie/movie.css');
                return $ocLazyLoad.load('../modules/movie/movie.js');
            }],
        }

    })

    // 关于我
    .state('aboutme',{
        name:'aboutme',
        url:'/aboutme',
        views : {
            'main' : {
                templateUrl: '/tpl/aboutme/about',
                controller: 'aboutmeController',
                controllerAs : 'vm'
            }
        },
        resolve: {
            deps:['$ocLazyLoad',function($ocLazyLoad) {
                $ocLazyLoad.load('../modules/aboutme/about.css');
                return $ocLazyLoad.load('../modules/aboutme/about.js');
            }],
        }

    })

    $urlRouterProvider.otherwise('/')
}])
// 简单的封装$http服务
.service('http', ['$http','loading','$q', function($http, loading, $q){
    var http = function(method, url, data){
        method = method.toUpperCase();
        var config = {
            method : method,
            url : url,
            cache : true,
            eventHandlers : {
                loadstart : function(){
                    loading.show();
                },
                readystatechange : function(){
                    loading.hide();
                }
            }
        };
        if( method === 'GET'){
            config.params = data;
        }else if( method === 'POST' ){
            config.data = data;
        }
        return $http(config).then(function(resolve){
            if(resolve.status == 200){
                return $q.resolve(resolve);
            }else{
                return $q.reject(resolve);
            }
        });
    };

    http.get = function(url,params){
        return http('GET', url, params);
    };
    
    http.post = function(url,params){
        return http('POST', url, params);
    };
    return http;
}])
// loading指令
.directive('loading', function(){
    return {
        restrict : 'EA',
        replace : true,
        template : '<div class="mask" id="loading"><div class="loading"></div></div>'
    }
})
// loading服务
.service('loading', ['$compile',function($compile){
    this.show =  function(){
        angular.element(document.querySelector("body")).append($compile("<loading></loading>")({}));
    }
    this.hide = function(){
        angular.element(document.querySelector("#loading")).remove();
    }
}])
.controller('mainCtrl', ['$rootScope','$scope','$translate', function($rootScope,$scope,$translate){
    /**
     * 改变当前页面的语言
     * @param  {string} language 语言代号：zh-cn | en-us
     */
     $scope.changeLanguage = function(language){
        localStorage.lang = language;
        $rootScope.lang = $scope.locLanguage = localStorage.lang;
        $translate.use(language);
    }
    $rootScope.lang=$scope.locLanguage = localStorage.lang;
}])
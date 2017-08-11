var debug = require('debug')('plcent.router');
var router = require('express').Router();
var path = require('path');

var doubanApi = require('./doubanApi');

router.get('/in_theaters',function(req,res,next){
	debug('获取正在上映电影信息')
	getMovieData('in_theaters',req,res);
})
router.get('/coming_soon',function(req,res,next){
	debug('获取即将上映电影信息')
	getMovieData('coming_soon',req,res);
})
router.get('/top250',function(req,res,next){
	debug('获取top250电影信息')
	getMovieData('top250',req,res);
})
router.get('/subject/:id',function(req,res,next){
	debug('获取某电影详情', req.params.id)
	doubanApi.subject(req.params.id).then(function(data){
		res.append('Access-Control-Allow-Origin', '*');
		res.json(data);
	}).catch(function(e){
		res.append('Access-Control-Allow-Origin', '*');
		res.json(e);
	});
})

var getMovieData = function(key,req,res){
	var start = req.query.start;
	var count = req.query.count;
	doubanApi[key](start,count).then(function(data){
		// 跨域
		res.append('Access-Control-Allow-Origin', '*');
		res.json(data);
	}).catch(function(e){
		res.append('Access-Control-Allow-Origin', '*');
		res.json(e);
	});
	
}

module.exports = router;
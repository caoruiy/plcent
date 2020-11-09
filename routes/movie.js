var debug = require('debug')('plcent.router');
var router = require('express').Router();
var fs = require('fs');
var path = require('path');

var map = {
	'/in_theaters': '/json/inTheater.json',
	'/coming_soon': '/json/coming_soon.json',
	'/top250': '/json/top250.json',
	'/subject/:id': '/json/subject.json'
};
router.get('/in_theaters', function (req, res, next) {
	debug('获取正在上映电影信息')
	getMovieData(req.route.path, req, res);
})
router.get('/coming_soon', function (req, res, next) {
	debug('获取即将上映电影信息2')
	getMovieData(req.route.path, req, res);
})
router.get('/top250', function (req, res, next) {
	debug('获取top250电影信息')
	getMovieData(req.route.path, req, res);
})
router.get('/subject/:id', function (req, res, next) {
	debug('获取某电影详情', req.params.id)
	fs.readFile(path.join(__dirname + map[req.route.path]), {
		encoding: 'utf-8'
	}, function (err, data) {
		if (err) {
			debug(err);
			res.status(500);
			res.json({});
		}
		var data = JSON.parse(data);
		res.json(data);
	});
})

var getMovieData = function (key, req, res) {
	var start = req.query.start;
	var count = req.query.count;
	fs.readFile(path.join(__dirname + map[key]), {
		encoding: 'utf-8'
	}, function (err, data) {
		if (err) {
			debug(err);
			res.status(500);
			res.json({});
		}
		var data = JSON.parse(data);
		data.start = start;
		data.count = count;
		data.subjects = data.subjects.splice(start, count);
		res.json(data);
	});
}

module.exports = router;
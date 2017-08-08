var express = require('express');
var debug = require('debug')('plcent.router');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

// 获取模板
router.get('/tpl/:dirname/:name', function(req, res, next) {
	var params = req.params;
	debug('加载模板：'+params['dirname']+'/'+params['name'])
	res.render(params['dirname']+'/'+params['name']);
});

module.exports = router;

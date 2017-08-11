var https= require('https');
var zlib = require('zlib');
var debug = require('debug')('plcent.douban');
var baseURL = 'https://api.douban.com/v2/movie/';

exports = module.exports = {};

exports.in_theaters = function(start,count){
	debug('in_theaters')
	return doubanCharts('in_theaters',start,count);
}
exports.coming_soon = function(start,count){
	return doubanCharts('coming_soon',start,count);
}
exports.top250 = function(start,count){
	return doubanCharts('top250',start,count);
}
// 获取电影详情
exports.subject = function(id){
	return doubanCharts('subject/'+id);
}

/**
 * 获取豆瓣的某榜单
 * @param  {string} url api路径
 * @param  {int} start 开始
 * @param  {int} count 数量
 * @return {promise}
 */
 var doubanCharts = function(url, start, count){
 	return new Promise(function(reslove, reject){
 		var resData = [];
		// addQuery(baseURL+url, {'start':start,'count':count})
		var req = https.request({
			protocol : 'https:',
			host : 'api.douban.com',
			path : addQuery('/v2/movie/'+url, {'start':start,'count':count}),
			method : 'GET',
			headers : {
				'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
				'Accept-Encoding':'gzip, deflate, br',
				'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
				'Cache-Control':'max-age=0',
				'Connection':'keep-alive',
				'Cookie':'bid=3WbIWOZxlJ8; ll="118169"; viewed="10746257"; __ads_session=9xSbSPxI6whVEGkXfQA=; gr_user_id=0bfd5166-0e04-4b88-82b9-8623de4ca78e; ps=y; _vwo_uuid_v2=0C8312B15FEA3528828B599E75DA3559|1d1823de0842c9b5355f1e3cb66de3ce; dbcl2="93440587:pP6k+KRjmgk"; _ga=GA1.2.2147209780.1494392827; ck=PO2n; push_noty_num=0; push_doumail_num=0; __utma=30149280.2147209780.1494392827.1502108976.1502204018.15; __utmc=30149280; __utmz=30149280.1502108976.14.8.utmcsr=localhost:3000|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmv=30149280.9344; ap=1',
				'Host' : 'api.douban.com',
				'Upgrade-Insecure-Requests':'1',
				'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
			}
		},function(res){
			// res.setEncoding('utf8');
			var gunzip = zlib.createGunzip();   
			res.pipe(gunzip);
			gunzip.on('data', function(data){
				resData.push(data.toString());
			})
			gunzip.on('end', function(){
				debug(resData.join())
				reslove(JSON.parse(resData.join('')))
			})
			res.on('error', function(e){
				reject(e);
			})
		})
		req.end();
	});
 }

/**
 * 为 url 添加 query 字符串
 * @param {string} url   url
 * @param {object} query 查询对象
 */
 var addQuery = function(url, queryObj){
 	var query = [];
 	Object.keys(queryObj).map(function(name){
 		if(queryObj[name] !== void 0 ||  queryObj[name] !== '' || queryObj[name] !== null){
 			query.push(name+'='+queryObj[name]);
 		}
 	})
 	return query.length ? url+'?'+query.join('&') : url;
 }
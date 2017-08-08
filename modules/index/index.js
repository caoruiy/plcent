app.controller('indexCtrl', ['$rootScope','$scope', function($rootScope,$scope){
	var imgs = [
	'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg',
	'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
	'https://ss3.bdstatic.com/iPoZeXSm1A5BphGlnYG/skin/406.jpg?2',
	'https://unsplash.it/g/1200/601',
	];
	var words = {
		'zh-cn':[
			"有些鸟儿是注定不会被关在牢笼里，它们的每一片羽毛都闪耀着光辉。",
			"决定我们一生的，不是我们的能力，而是我们的选择。",
			"昨日已逝，明天尚远，今天才是老天赐予的礼物。",
			"成功就是日复一日那一点点小小努力的积累。",
			"明年今日，你会希望此时此刻自己已经行动了。",
			"预定一米阳光，装进心房。欢畅的风，轻敲我的心窗。",
			"每天出去走走，奇迹就在身边。",
			"微笑和沉默是两把利器：微笑解决很多问题，沉默避免许多问题。 "
		],
		'en-us':[
			"Some birds are not meant to be caged; their feathers are just too bright. ",
			"It is our choices that show what we truly are, far more than our abilities.",
			"Yesterday is history. Tomorrow is mystery. But today is a gift.",
			"Success is the sum of small efforts, repeated day in and day out.",
			"A year from now, you will wish you had started today.",
			"Reserve one meter sunshine and put them in atrium. Elated wind, tap my heart window.",
			"Get outside every day. Miracles are waiting everywhere.",
			"Smile and silence are two powerful tools. Smile is the way to solve many problems and silence is the way to avoid many problems."
		]
	}
	$scope.bgImg = imgs[Math.round(Math.random()*10)%imgs.length];
	
	$scope.randomWords = Math.round(Math.random()*10)%words[$rootScope.lang].length;

	$scope.words = words[$rootScope.lang][$scope.randomWords];
	$rootScope.$watch('lang', function(newVal, oldVal){
		if(newVal !== undefined){
			$scope.words = words[newVal][$scope.randomWords];
		}
	})
}]);
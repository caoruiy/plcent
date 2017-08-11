app.controller('indexCtrl', ['$rootScope','$scope','$interval', function($rootScope,$scope, $interval){
	var imgs = [
	'https://ss2.bdstatic.com/kfoZeXSm1A5BphGlnYG/skin/113.jpg?2',
	'https://ss3.bdstatic.com/lPoZeXSm1A5BphGlnYG/skin/34.jpg?2',
	'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/29.jpg?2',
	'https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/12.jpg?2',
	'https://ss3.bdstatic.com/lPoZeXSm1A5BphGlnYG/skin/122.jpg?2',
	'https://ss3.bdstatic.com/iPoZeXSm1A5BphGlnYG/skin/38.jpg?2',
	'https://ss2.bdstatic.com/kfoZeXSm1A5BphGlnYG/skin/177.jpg?2',
	'https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/451.jpg?2',
	'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg',
	// 'https://ss3.bdstatic.com/iPoZeXSm1A5BphGlnYG/skin/406.jpg?2',
	'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/skin/183.jpg?2',
	'https://ss3.bdstatic.com/lPoZeXSm1A5BphGlnYG/skin/74.jpg?2',
	'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/541.jpg?2',
	'https://ss3.bdstatic.com/iPoZeXSm1A5BphGlnYG/skin/30.jpg?2'

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

	
	$scope.randomWords = Math.round(Math.random()*100)%words[$rootScope.lang].length;

	$scope.words = words[$rootScope.lang][$scope.randomWords];
	$rootScope.$watch('lang', function(newVal, oldVal){
		if(newVal !== void 0){
			$scope.words = words[newVal][$scope.randomWords];
		}
	})

	var setBackground = function(){
		$scope.bgImg = imgs[Math.round(Math.random()*100)%imgs.length];
	}

	setBackground();

	$interval(setBackground, 6000);
}]);
// 豆瓣API
app.service('douban', ['http', 'isDebug', function (http, isDebug) {
	// 豆瓣电影API地址
	var apiBaseUrl = !isDebug ? "http://localhost:3000/v2/movie/" : "http://localhost:4000/v2/movie/";

	/**
	 * 正在上映的电影
	 * @param  {int} currentPage  当前页码
	 * @param  {int} itemsPerPage 单页数量
	 * @return {object}              promise
	 */
	this.inTheaters = function (currentPage, itemsPerPage) {
		return http.get(apiBaseUrl + 'in_theaters', getOptions(currentPage, itemsPerPage))
	}
	/**
	 * 即将上映的电影
	 * @param  {int} currentPage  当前页码
	 * @param  {int} itemsPerPage 单页数量
	 * @return {object}              promise
	 */
	this.comingSoon = function (currentPage, itemsPerPage) {
		return http.get(apiBaseUrl + 'coming_soon', getOptions(currentPage, itemsPerPage))
	}
	/**
	 * top250的电影
	 * @param  {int} currentPage  当前页码
	 * @param  {int} itemsPerPage 单页数量
	 * @return {object}              promise
	 */
	this.top250 = function (currentPage, itemsPerPage) {
		return http.get(apiBaseUrl + 'top250', getOptions(currentPage, itemsPerPage))
	}

	/**
	 * 获取电影详情
	 * @param  {int} id 豆瓣电影ID
	 * @return {object}    promise
	 */
	this.detail = function (id) {
		return http.get(apiBaseUrl + 'subject/' + id);
	}

	// 异常处理
	this.dealReject = function (reject) {
		console.log(reject);
	}

	/**
	 * 获取分页的起始位置和数据条数
	 */
	var getOptions = function (currentPage, itemsPerPage) {
		return {
			start: (currentPage - 1) * itemsPerPage,
			count: itemsPerPage
		};
	}
}])
app.controller('movieCtrl', ['$scope', 'douban', '$state', '$document', '$animate', function ($scope, douban, $state, $document, $animate) {
	$scope.pageOption = {
		"itemsPerPage": 10,// 单页数量
		"currentPage": 1,//当前页码
		"totalItems": 1 // 总条数
	};// 分页信息
	$scope.currentStatus = {
		"dataType": '', // 当前操作的数据集
	};//当前的操作状态
	$scope.inTheaters = [];// 获取正在上映电影
	$scope.comingSoon = [];// 获取即将上映电影
	$scope.top250 = [];// 获取top250的电影

	// 获取正在上映电影
	$scope.inTheatersFun = function (currentPage) {
		getDoubanApi(currentPage, 'inTheaters', 'inTheaters', 'inTheatersFun');
	}

	// 获取即将上映电影
	$scope.commingSoonFun = function (currentPage) {
		getDoubanApi(currentPage, 'comingSoon', 'comingSoon', 'commingSoonFun');
	}

	// 获取top250的电影
	$scope.top250Fun = function (currentPage) {
		getDoubanApi(currentPage, 'top250', 'top250', 'top250Fun');
	}
	/**
	 * 处理拉去数据后，更新当前状态和分页信息
	 * @param  {object} data api返回的数据
	 * @param  {string} type 拉去该api数据的方法名称
	 */
	var changePageAndStatus = function (data, getApiFunName) {
		$scope.pageOption = {
			"itemsPerPage": data.count,
			"currentPage": parseInt(data.start / data.count) + 1,
			"totalItems": data.total
		};
		$scope.currentStatus.dataType = getApiFunName;
	}

	/**
	 * 访问豆瓣API的通用方法
	 * @param  {int} currentPage   当前页码，当不传递该值时，是否分页中的页码信息
	 * @param  {string} apiName       调用的douban服务中API方法名称
	 * @param  {string} scopeParaName 返回的数据保存在scope的哪个变量中
	 * @param  {string} loclFunName   调用该方法的方法名称
	 */
	var getDoubanApi = function (currentPage, apiName, scopeParaName, loclFunName) {
		currentPage = currentPage || $scope.pageOption.currentPage;
		douban[apiName](currentPage, $scope.pageOption.itemsPerPage).then(function (reslove) {
			$scope[scopeParaName] = reslove.data.subjects;
			changePageAndStatus(reslove.data, loclFunName);
		}).catch(function (reject) {
			douban.dealReject(reject);
		});
	}

	/**
	 * 显示电影详情
	 * @param  {int} id 电影豆瓣ID
	 */
	$scope.showDetail = function (id) {
		$state.go('movie.detail', { id: id });
	}
	// 修改页码时，拉取新数据
	$scope.changeThePage = function () {
		$scope[$scope.currentStatus.dataType]($scope.pageOption.currentPage);
	}

}])
// 电影详情
app.controller('movieDetailCtrl', ['$scope', '$stateParams', 'douban', '$state', '$', '$timeout', function ($scope, $stateParams, douban, $state, $, $timeout) {
	$scope.movie = {};
	$scope.movie.id = $stateParams.id;
	douban.detail($scope.movie.id).then(function (reslove) {
		$scope.movie.detail = reslove.data;
		$timeout(function () {
			$('.movie-detail').addClass('show');
			$('body').addClass('no-scroll');
		}, 1)
	}).catch(function (reject) {
		douban.dealReject(reject);
	});

	$scope.goToMovie = function () {
		$state.go('movie');
		$timeout(function () {
			$('.movie-detail').removeClass('show');
			$('body').removeClass('no-scroll');
		}, 1)
	}
}])





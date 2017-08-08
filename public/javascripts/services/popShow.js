/**
 * popShow组件
 *
 * 作用：该组件只提供一个功能，就是在点击某元素时，会把元素内的第一张图片放到页面左上角固定的位置
 *
 * 组要的应用场景在于：点击电影海报时，会把海报移动到页面左上角，类似于点击图片，图片全屏显示的功能。
 */
angular.module('plcent.popShow',[])

.directive('popShow', ['$animate','$','$timeout','popShowInstance',function($animate, $, $timeout, popShowInstance){
	return function(scope, elem, attrs){
		elem.on('click', function(){
			var img = elem.find('img'),
				src = img.attr('src');
			if(popShowInstance.has()){
				popShowInstance.clear();
			}
			
			// 创建新img元素
			var cImg = $('<img>');
			cImg.attr('src',src);
			cImg.addClass('positionAbsolute');
			elem.append(cImg.element());
			popShowInstance.add(cImg);
			$timeout(function(){
				// cImg.addClass('positionFixedMovie');
			},100);
		});

	}
}])
.service('popShowInstance',[function(){
	var instance = [];

	this.has = function(){
		return instance.length && true;
	}

	this.add = function(ele){
		instance.push(ele);
	}

	this.clear = function(){
		for(var i in instance){
			instance[i].remove();
		}
		instance = [];
	}

}])
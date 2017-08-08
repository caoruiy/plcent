angular.module('plcent.miniJquery',[])
.factory('$', ['$window', function($window){
	/**
	 * lightweight like jquery object and just deal one element once time
	 * @param  {string} selector selector
	 */
	 function $(selector){
	 	// match <tag>, create element
	 	if ( selector[ 0 ] === "<" &&
	 		selector[ selector.length - 1 ] === ">" &&
	 		selector.length >= 3 ) {
	 		selector = selector.substr(1, selector.length-2);
	 	this[0] = angular.element(document.createElement(selector));

	 }else{
	 	this[0] = angular.element(document.querySelectorAll(selector));
	 }

	 if(this[0][0]){
	 	this.length = this[0].length;
	 }else{
	 	this.length = 0;
	 }
	}
	/**
	 * add class for element
	 * @param {string} className class name
	 */
	 $.prototype.addClass = function(className){
	 	this[0].addClass(className);
	 	return this;
	 }
	/**
	 * remove class for element
	 * @param {string} className class name
	 */
	 $.prototype.removeClass = function(className){
	 	this[0].removeClass(className);
	 	return this;
	 }
	/**
	 * set class for element
	 * @param {string} className class name
	 */
	 $.prototype.setClass = function(className){
	 	this[0].attr('class', className);
	 	return this;
	 }
	/**
	 * Determines whether the specified element contains a classset class for element
	 * @param {string} className class name
	 */
	 $.prototype.hasClass = function(className){
	 	return this[0].hasClass(className);
	 }

	/**
	 * 返回当前的element对象
	 * @return {DOM Elemnet} angular.element包裹的element对象
	 */
	 $.prototype.element = function(){
	 	return this[0];
	 }
	 /**
	  * 查找子元素
	  * @param  {string} selector 选择器
	  */
	  $.prototype.find = function(selector){
	  	if(!this[0][0] || !selector){
	  		return this.reset();
	  	}
	  	this[0] = angular.element(this[0][0].querySelectorAll(selector));
	  	return this;
	  }
	 /**
	  * 将当前操作对象制空
	  * @return {object} this
	  */
	  $.prototype.reset = function(){
	  	this.setElement();
	  	return this;
	  }
	 /**
	  * 将一个angular.elemnet对象包裹的对象设置成当前操作的对象
	  * @param {element} element 
	  * @return {object} this
	  */
	  $.prototype.setElement = function(element){
	  	if(element){
	  		this[0] = element;
	  	}else{
	  		this.length = 0;
	  		this[0] = angular.element();
	  	}
	  	return this;
	  }

	  /**
	   * 在当前选择下每个元素之后添加元素
	   */
	   $.prototype.after = function(content, content){
	   	this[0].after(content, content);
	   	return this;
	   }
	  /**
	   * 在当前选择下每个元素内添加元素
	   */
	   $.prototype.append = function(content, content){
	   	this[0].append(content, content);
	   	return this;
	   }

	  /**
	   * 设置属性
	   */
	   $.prototype.attr = function(attributeName, value){
	   	this[0].attr(attributeName, value);
	   	return this;
	   }

	  /**
	   * 设置属性
	   */
	   $.prototype.remove = function(){
	   	this[0].remove();
	   }

	  /**
	   * 获取当前选择器下第一个元素
	   * @return {object} this
	   */
	   $.prototype.first = function(){
	   	this[0] =  this[0][0];
	   	return this;
	   }

	  /**
	   * 绑定事件
	   */
	   $.prototype.on = function(event, callback){
	   	this[0].on(event, callback);
	   	return this;
	   }
	  /**
	   * 解除绑定事件
	   */
	   $.prototype.off = function(event, callback){
	   	this[0].off(event, callback);
	   	return this;
	   }
	  /**
	   * 绑定单次事件
	   */
	   $.prototype.once = function(event, callback){
	   	this[0].once(event, callback);
	   	return this;
	   }

	   return function(selector){
	   	return new $(selector);
	   }
	}])
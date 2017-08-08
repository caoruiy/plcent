app.service("douban",["http","isDebug",function(t,e){var n=e?"http://localhost:3000/v2/movie/":"https://api.douban.com/v2/movie/";this.inTheaters=function(e,a){return t.get(n+"in_theaters",o(e,a))},this.comingSoon=function(e,a){return t.get(n+"coming_soon",o(e,a))},this.top250=function(e,a){return t.get(n+"top250",o(e,a))},this.detail=function(e){return t.get(n+"subject/"+e)},this.dealReject=function(t){console.log(t)};var o=function(t,e){return{start:(t-1)*e,count:e}}}]),app.controller("movieCtrl",["$scope","douban","$state","$document","$animate",function(t,e,n,o,a){t.pageOption={itemsPerPage:10,currentPage:1,totalItems:1},t.currentStatus={dataType:""},t.inTheaters=[],t.comingSoon=[],t.top250=[],t.inTheatersFun=function(t){c(t,"inTheaters","inTheaters","inTheatersFun")},t.commingSoonFun=function(t){c(t,"comingSoon","comingSoon","commingSoonFun")},t.top250Fun=function(t){c(t,"top250","top250","top250Fun")};var i=function(e,n){t.pageOption={itemsPerPage:e.count,currentPage:parseInt(e.start/e.count)+1,totalItems:e.total},t.currentStatus.dataType=n},c=function(n,o,a,c){n=n||t.pageOption.currentPage,e[o](n,t.pageOption.itemsPerPage).then(function(e){t[a]=e.data.subjects,i(e.data,c)}).catch(function(t){e.dealReject(t)})};t.showDetail=function(t){n.go("movie.detail",{id:t})},t.changeThePage=function(){t[t.currentStatus.dataType](t.pageOption.currentPage)}}]),app.controller("movieDetailCtrl",["$scope","$stateParams","douban","$state","$","$timeout",function(t,e,n,o,a,i){t.movie={},t.movie.id=e.id,n.detail(t.movie.id).then(function(e){t.movie.detail=e.data,i(function(){a(".movie-detail").addClass("show"),a("body").addClass("no-scroll")},1)}).catch(function(t){n.dealReject(t)}),t.goToMovie=function(){o.go("movie"),i(function(){a(".movie-detail").removeClass("show"),a("body").removeClass("no-scroll")},1)}}]);
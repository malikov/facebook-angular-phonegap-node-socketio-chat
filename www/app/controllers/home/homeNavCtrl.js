'use strict';

/*
	This is a controller for the home navigator
*/


var app  = angular.module('MobileDev');

app.controller('HomeNavCtrl',['$rootScope','$scope','constants', function($rootScope,$scope,constants){

	console.log('Entering the HomeNavCtrl');

	console.log('loging the rootscope');
	console.log($rootScope);

	console.log('loging the child scope');
	console.log($scope)
	
	var view = {
		title : constants.app_name+' - Homepage',
		template : 'pages/home/index.html'
	}

	$scope.toggleSlidingMenu = function(){
		ons.slidingMenu.toggleMenu();
	}

	$scope.view = view;

}])
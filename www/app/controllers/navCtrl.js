'use strict';

var app  = angular.module('MobileDev');

app.controller('NavCtrl',['$rootScope','$scope','constants', function($rootScope,$scope,constants){

	console.log('Entering the NavCtrl');

	console.log('loging the rootscope');
	console.log($rootScope);

	console.log('loging the child scope');
	console.log($scope)
	
	var mainView = {
		menuTpl : 'pages/sliding_menu.html',
		homepageTpl : 'pages/homeNavigator.html'
	}

	var homeNavigator = {
		title : constants.app_name+' - Homepage',
		template : 'pages/home/index.html',
		toggleMenu : function(){
			/*
				perhaps this should be only in one variable
			*/
			$scope.ons.slidingMenu.toggleMenu();
		}
	}

	var profileNavigator = {
		title : constants.app_name+' - Profile',
		template : 'pages/profile/index.html',
		toggleMenu : function(){
			$scope.ons.slidingMenu.toggleMenu();
		}
	}

	var facebookNavigator = {
		title : constants.app_name+' - Fb',
		template : 'pages/facebook/index.html',
		toggleMenu : function(){
			$scope.ons.slidingMenu.toggleMenu();
		}
	}
	
	$scope.homeNav = homeNavigator;
	$scope.profileNav = profileNavigator;
	$scope.fbNav = facebookNavigator;
	
}])
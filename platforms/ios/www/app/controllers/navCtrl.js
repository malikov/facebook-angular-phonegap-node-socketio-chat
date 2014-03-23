'use strict';

var app  = angular.module('FanPhoneChat');

app.controller('NavCtrl',['$scope','constants', 
	function($scope,constants){

	console.log('line 8 -- app/controllers/navCtrl.js');
	console.log($scope)
	
	
	var homeNavigator = {
		title : constants.app_name,
		template : 'pages/home/index.tpl.html',
		toggleMenu : function(){
			$scope.ons.slidingMenu.toggleMenu();
		}
	}

	var registerNavigator = {
		title : constants.app_name,
		template : 'pages/register/index.tpl.html',
		toggleMenu : function(){
			$scope.ons.slidingMenu.toggleMenu();
		}
	}
	
	$scope.navMenu = {
		home : homeNavigator,
		register : registerNavigator
	}
	
}])
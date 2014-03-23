'use strict';

var app  = angular.module('FanPhoneChat');

app.controller('MainViewCtrl',['$scope','$timeout','Auth','constants','splashscreen',
	function($scope,$timeout,Auth,constants,splashscreen){

	console.log('line 8 -- MainViewCtrl --> loging the child scope');
	console.log($scope)
	
	var mainView = {
		menuTpl : 'pages/main/slidingMenu.tpl.html',
		loggedTpl : 'pages/home/homeNavigator.tpl.html',
		registerTpl : 'pages/register/registerNavigator.tpl.html'
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

	$scope.Auth = Auth;
	$scope.main = mainView;
	$scope.homeNav = homeNavigator;
	$scope.profileNav = profileNavigator;
	$scope.fbNav = facebookNavigator;
    
	/*
		hide the splashcreen when all of this is rendered
	*/
	$timeout(function(){
	 	splashscreen.hide()
	},
	8000);
	

	
}])
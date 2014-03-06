'use strict';

/*
	This is a controller for the home navigator
*/


var app  = angular.module('MobileDev');

app.controller('HomeViewCtrl',['$rootScope','$scope','Auth',
 function($rootScope,$scope,Auth){

	console.log('Entering the HomeViewCtrl');

	console.log('loging the rootscope');
	console.log($rootScope);

	console.log('loging the child scope');
	console.log($scope)
	
	var view = {
		title : "Home Page"
	}

	$scope.view = view;

	



	$scope.pushLocalStorage = function(){
		console.log('pushLocalStorage');
		$scope.ons.navigator.pushPage('pages/profile/index.html', { title: 'Profile' });
	}

	$scope.pushFbLogin = function(){
		console.log('pushFbLogin');

		if (Auth.isLoggedIn()) //logged in update Auth 
			return $scope.ons.navigator.pushPage('pages/facebook/index.html', { title: 'Profile' });
	
		$scope.$on('event:login-successfull',function(response){
			console.log('event:login-successfull caught ');
			$scope.ons.navigator.pushPage('pages/facebook/index.html', { title: 'Facebook Profile' });
		});
				// not login
		Auth.login('facebook');
	}

	$scope.pushFbLogout = function(){
		console.log('pushFbLogout');

		Auth.logout();
		//alert to say you've been logged out
	}

	$scope.pushFbWallPost = function(){
		console.log('pushFbWallPost');

	}

	$scope.testGetPicture = function(){
		$scope.ons.navigator.pushPage('pages/facebook/getPicture.html', { title: 'Facebook picture' });
	}


}]);
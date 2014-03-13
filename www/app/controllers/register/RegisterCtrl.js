'use strict';

var app  = angular.module('FanPhoneChat');

app.controller('RegisterCtrl',['$rootScope','$scope','$timeout','Auth','constants','splashscreen',
	function($rootScope,$scope,$timeout,Auth,constants,splashscreen){

	console.log('RegisterCtrl loaded');

	$scope.Register = function(){
		alert('register clicked');
	}

	$scope.FbLogin = function(){
		alert('FB login clicked');
	}

	$scope.InstagramLogin = function(){
		alert('InstagramLogin clicked');
	}
	
}])
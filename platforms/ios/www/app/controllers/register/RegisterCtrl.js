'use strict';

var app  = angular.module('FanPhoneChat');

app.controller('RegisterCtrl',['$scope','Auth','constants',
	function($scope,Auth,constants){

	console.log('line 8 -- app/controllers/register/RegisterCtrl.js loaded ...');

	
	var controller = {
		pages : {
			join : 'pages/register/join.tpl.html',
			login : 'pages/register/login.tpl.html'
		}
	}

	controller.tap = function(action){
		switch(action){
			case 'join':
				console.log("line 23 -- app/controllers/register/RegisterCtrl.js : you've tapped on "+action);
				$scope.ons.navigator.pushPage(this.pages.join, { title: 'Register' });
			break;

			case 'login':
				console.log("line 28 -- app/controllers/register/RegisterCtrl.js : you've tapped on "+action);
				$scope.ons.navigator.pushPage(this.pages.login, { title: 'Login' });
			break;

			default:
				alert("you've tapped on "+action+" --> Default");
		}
	}

	controller.save = function(user,type){
		var user = user || {};
		var type = type || '';

		console.log("line 41 -- app/controllers/register/RegisterCtrl.js --> registering user ...");
		console.log(user);
		var userModel = new User(user);

		var success = function(response){
			//if success then authenticate user
			console.log("line 47 -- app/controllers/register/RegisterCtrl.js --> register success authenticating ...");
		}
		userModel.register(success);
	}

	controller.authenticate = function(user,type){
		var user = user || {};
		var type = type || '';

		// if no type regular login
	}
	

	$scope.controller = controller;
	
}])
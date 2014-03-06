'use strict';

angular.module('MobileDev', [ 
	'ngTouch',
	'ngResource', 
	'onsen.directives',
	'btford.phonegap.ready',
	'malikov.phonegap.splashscreen',
	'malikov.phonegap.storage',
	'malikov.phonegap.facebook'
])
.config(['$locationProvider','$provide','$httpProvider',
	function($locationProvider,$provide,$httpProvider){
	/*
		Define interceptors for the system here
	*/

	console.log('angular.config');

	console.log('log locationProvider');
	console.log($locationProvider);

	/*
		creating a provider to intercept errors or 401 requests
	*/

	/*
		interceptor
	*/
	$provide.factory('mobileDevInterceptor',function($q, $rootScope){
		console.log($q);
		console.log($rootScope);
		
		var interceptor = {
			/*
				Catches request before it is sent
			*/
			request : function(config){
				console.log("Request");
				console.log(config);
					
				/*
					handle requests here
				*/
					
				return config || $q.when(config);
			},
			
			/*
				Catches errors when request fails
			*/
			requestError : function(requestError){
				console.log("RequestError");
				console.log(requestError);
				
				/*
					handle error here
				*/
				
				return $q.reject(requestError);
			},
			
			/*
				Handles response success
			*/
			response : function(response){
				console.log("Response");
				console.log(response);
				
				return response || $q.when(response);
			},
			
			/*
				Handles response failure
			*/
			responseError : function(error){
				console.log("ResponseError");
				console.log("Error status : "+error.status);
				console.log(error);
				
				return $q.reject(error);
			}			
		};
		
		return interceptor;
		
	  });
	  
	  
	  /*
		Adding interceptor to the httpProvider
	  */
	  $httpProvider.interceptors.push('mobileDevInterceptor');

}])
.run(['$rootScope','Auth', 'splashscreen', 'facebook', 'constants','localstorage',
	function($rootScope, Auth, splashscreen, facebook, constants,localstorage){
	
	/*
		launch additional information here
	*/
	console.log('angular.run');
	splashscreen.display();

	/*
		init facebook here and setup events ass well
	*/
	var permissions = ['user_status', 'publish_checkins', 'user_likes'];

	facebook.init(constants.facebook.appId,{permissions : permissions}); //if you don't want to add permissions and stuff just add the ID

	facebook.eventSubscribe('auth.login', function(response) {
			console.log("auth.login event subscribe callback response"+JSON.stringify(response));
			console.log(response); 
			//alert('auth.login event');
	});

	facebook.eventSubscribe('auth.logout', function(response) {
			console.log("auth.logout event subscribe callback response"+JSON.stringify(response));
			console.log(response); 
			//alert('auth.logout event');
	});

	facebook.eventSubscribe('auth.sessionChange', function(response) {
			console.log("auth.sessionChange event subscribe callback response"+JSON.stringify(response));
			console.log(response); 
			//alert('auth.sessionChange event');
	});

	facebook.eventSubscribe('auth.statusChange', function(response){
			console.log("auth.statusChange event subscribe callback response"+JSON.stringify(response));
			console.log(response); 
			//alert('auth.statusChange event');
	});

	var handleStatusChange = function(response){
		console.log('handleStatusChange callback');
		if (response.authResponse){
			console.log('logged in');
	
			facebook.me(function(response){
				console.log("facebook me called");
				var user = {id: response.authResponse.userId, name : response.name};
				localstorage.setItem('app_user',user);
				Auth.changeUser(user);
			})	

		}else{
			console.log('not logged in');

		}
	}

	facebook.getLoginStatus(handleStatusChange);

}]);

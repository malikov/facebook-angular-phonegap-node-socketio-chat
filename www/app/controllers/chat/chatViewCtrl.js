'use strict';

var app  = angular.module('MobileDev');

app.controller('FbViewCtrl',['$rootScope','$scope','Auth','facebook', 
function($rootScope,$scope,Auth,facebook){

	console.log('Entering the fbViewCtrl');

	console.log('loging the rootscope');
	console.log($rootScope);

	console.log('loging the child scope');
	console.log($scope)

	$scope.user = Auth.currentUser;
	

	// fetching the user's facebook profile picture
	var success = function(data,status,headers,config){
        //console.log("getPicture success : "+JSON.stringify(data));
        if(status === 200)
        	$scope.user.avatar = config.url;
    }

    var error = function(data,status,headers,config){
       console.log("getPicture error : "+JSON.stringify(data));
    }

    var options = {
    	width:100, 
    	height:100, 
    	successCallback : success, 
    	errorCallback : error
   	}

    facebook.getPicture($scope.user.id,options);
}])
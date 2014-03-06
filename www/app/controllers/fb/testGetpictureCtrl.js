'use strict';

var app  = angular.module('MobileDev');

app.controller('GetPictureCtrl',['$rootScope','$scope','facebook', 
function($rootScope,$scope,facebook){

	console.log('Entering the GetPictureCtrl');

	console.log('loging the rootscope');
	console.log($rootScope);

	console.log('loging the child scope');
	console.log($scope)

	
	// fetching the user's facebook profile picture
	var success = function(data,status,headers,config){
        //console.log("getPicture success : "+JSON.stringify(data));
         if(status === 200)
            $scope.avatar = config.url;
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

    facebook.getPicture(505745834,options);
}])
'use.strict'

var app = angular.module('MobileDev');

app.factory('constants',[function(){
  	
  	var constants = {
  		app_name : 'Mobile Dev',
  		facebook : {
  			appId : 583766421701316,
  			token : ''
  		},
  		twitter : {
  			appId : '',
  			token : ''
  		},
  		instagram : {
  			appId : '',
  			token : ''
  		}
  	};

  	return constants;
  }])
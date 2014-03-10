'use.strict'

var app = angular.module('FanPhoneChat');

app.factory('constants',[function(){
  	
  	var constants = {
  		app_name : 'FanPhoneChat',
  		facebook : {
  			appId : 263820857128226,
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
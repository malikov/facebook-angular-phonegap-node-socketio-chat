'use.strict'

var app = angular.module('FanPhoneChat');

app.factory('CService',['$resource','localstorage','User', 
  function($resource,localstorage,User){

    
    var user = function(){};
    user.resource = resource('api/users/:userId',{userId : '@id'},
             {
              getInfo : {method: 'GET', params: {userId : '@id'}, isArray : false}, // query detail which is an object not an array
              postInfo : {method: 'POST', params: {userId : '@id', user : '@user'}, isArray : false} // query detail which is an object not an array
             });
     
     user.model = angular.copy();

      /* not yet working I'm fixing the Auth service so that the auth service handles the login part
  		login : function(){
        var success = function(response){
          console.log('success');
        }

        var error = function(error){
          console.log('error');
        }

  		  return Auth.login(this,success,error);

  		},
      fbLogin : function(){
        var loginCallBack = function(){

        }


      },
      logout : function(){
        var success = function(response){
          console.log('success');
        }

        var error = function(error){
          console.log('error');
        }

        return Auth.logout(this,success,error);
      },*/
      getInfo : function(){
        var success = function(response){
          console.log('success');
        }

        var error = function(error){
          console.log('error');
        }

        return this.resource.getInfo({userId : this.info.id},success,error);
      },
      updateInfo : function(){
        var success = function(response){
          console.log('success');
        }

        var error = function(error){
          console.log('error');
        }

        return this.resource.postInfo({userId : this.info.id},success,error);
      },
      getMessages : function(){
        /*
          This method should use Message service and update 
        */
        var success = function(response){
          console.log('success');
        }

        var error = function(error){
          console.log('error');
        }

        return this.messages.getMessagesByUserId({userId : this.info.id},success,error);
      },
      postMessage : function(message){
        var success = function(response){
          console.log('success');
        }

        var error = function(error){
          console.log('error');
        }

        return this.messages.userPostMessages({userId : this.info.id, content : message},success,error);
      }
  		
  	};

  	return user;
  }])
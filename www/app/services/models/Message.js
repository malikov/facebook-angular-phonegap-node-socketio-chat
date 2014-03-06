'use.strict'

var app = angular.module('MobileDev');

app.factory('User',['$resource','localstorage', 
  function($resource,localstorage){

    
    var user = {
  		resource : $resource('api/users/:userId/:messages',
             {userId : '@id'},
             {
              getInfo : {method: 'GET', params: {userId : '@id'}, isArray : false}, // query detail which is an object not an array
              postInfo : {method: 'POST', params: {userId : '@id', user : '@user'}, isArray : false} // query detail which is an object not an array
              
              // wrong the call should be api/messages/:userId ? index = i & count = c
              // need to create a service for that
              //getMessages : {method: 'GET', params: {i:'@index', c:'@count', userId : '@id', messages : 'messages'}, isArray: true}, //query list of messages
              //postMessage :  {method: 'POST', params: {userId :'@id',content : '@content', messages:'messages'}, isArray: true}
             }),
      messages : {}, // should be angular.copy(Messages) // the messages service
  		info : {
        id: 'undefined',
        name : 'undefined',
        email : 'undefined',
        avatar : 'undefined',
        //role: userAccess.userRoles.public
      },
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
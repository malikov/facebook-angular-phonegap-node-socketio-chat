'use.strict'

var app = angular.module('FanPhoneChat');

app.factory('User',['$resource','localstorage','Message',
  function($resource,localstorage, Message){

    var user = function(){};
    
    user.resource = function(){ 
      return $resource('api/users/:userId/:messages', {userId : '@id'},
             {
              getInfo : {method: 'GET', params: {userId : '@id'}, isArray : false}, // query detail which is an object not an array
              postInfo : {method: 'POST', params: {userId : '@id', user : '@user'}, isArray : false} // query detail which is an object not an array
             });
    }

    user.info = {};

    user.messages = function(){
      return angular.copy(Messages) || {}; // should never be empty
    }
    
    user.login = function(type){
      
      type = type || undefined;

      var self = this;
      
      var success = function(response){
        console.log('success');
      }

      var error = function(error){
        console.log('error');
      }

      return Auth.login(this,success,error);
    }

    user.logout = function(){

    }

    user.getInfo = function(){
        var success = function(response){
          console.log('success');
        }

        var error = function(error){
          console.log('error');
        }

        return this.resource.getInfo({userId : this.info.id},success,error);
    }
    
    user.updateInfo = function(){
      var success = function(response){
        console.log('success');
      }

      var error = function(error){
        console.log('error');
      }

      //return this.resource.postInfo({userId : this.info.id},success,error);
    }
    
    user.getMessages = function(success,error){
        /*
          This method should use Message service and update 
        */
        var success =  success || function(response){
          console.log('success');
          /*
            getMessages then push to array
          */
        }

        var error = error || function(error){
          console.log('error');
        }

        return this.messages.getMessagesByUserId({userId : this.info.id},success,error);
    }
     
    user.postMessage = function(message, success, error){
      var success = function(response){
        console.log('success');
      }

      var error = function(error){
        console.log('error');
      }

      return this.messages.userPostMessages({userId : this.info.id, content : message},success,error);
    }

  	return user;
  }])
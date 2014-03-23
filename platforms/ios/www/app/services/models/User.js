'use.strict'

var app = angular.module('FanPhoneChat');

app.factory('User',['$resource','$http','Message',
  function($resource,$http, Message){

    var user = function(info){
      this.info = info || {};
      this.messageModel = new Message();
      this.resource = $resource('api/users/:userId', 
            {userId : '@id'},
            {
              // POST /api/users
              register : {method : 'POST', params : {user : '@info'}},

              // GET /api/users
              getAll : {method: 'GET', params: {}, isArray : true},

              // GET /api/users/:id
              getById : {method: 'GET', params: {messageId : '@id'}, isArray : false}, 
            });
    };
  
    user.register = function(success,error){
      var self = this;

      var success = success || function(response){
        console.log('success');
      }

      var error = error || function(error){
        console.log('error');
      }

      return this.resource.register({},success,error);
    }

    user.login = function(type, success, error){
      
      type = type || undefined;

      var self = this;
      
      var success = success || function(response){
        console.log('success');
      }

      var error = error || function(error){
        console.log('error');
      }

      return Auth.login(this,success,error);
    }

    user.logout = function($http){

    }

    user.getById = function(id){
        var success = function(response){
          console.log('success');
        }

        var error = function(error){
          console.log('error');
        }

        return this.resource.getById({userId : id},success,error);
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
    
    user.sendMessage = function(params){
      var self = this;

      var message = message || "";

      var params = angular.extend(params,{userId : self.info.id});

      var filters = false;

      var success = function(response){
        console.log('success');
      }

      var error = function(error){
        console.log('error');
      }

      return this.messageModel.post(params,filters,success,error);
    }

  	return user;
  }])
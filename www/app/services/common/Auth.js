'use strict';

var app = angular.module('MobileDev');

app.factory('Auth', ['$rootScope','localstorage', '$resource','User','facebook',
  function($rootScope,localstorage,$resource,User,facebook){

   
   var auth = {
      authResource : $resource('api/:me/:login/:logout',
          {},
          {
            login : {method: 'POST', params: {login:'login', user : '@user'}, isArray : false},
            logout : {method: 'GET', params: {logout : 'logout'}, isArray : false}
          }),
      userService : angular.copy(User),
      currentUser : localstorage.getItem('app_user') || angular.copy(User.info), // I need a copy of the service NOT the service 

      changeUser : function(user){
        angular.extend(this.currentUser,user);
      },
      authorize: function(accessLevel, role) {
        // todo

      },
      isLoggedIn: function() {
        console.log('isLoggedIn function called');

        return this.currentUser.id !== 'undefined'; //perhaps a better method for verifying if a user is loggdein could be used ??
      },
      login: function(provider) {
        console.log("Auth.login called");
        var self = this;

        switch(provider){
          case "facebook" : 
            console.log("Auth.login with facebook");

            //login in with facebook
            var facebookCallBack = function(response){
              console.log("facebookCallBack called");
              // update current user if everything went well
              //broadcast event to say event:loginsuccessfull
              if(response.authResponse){
                console.log("facebook callback response"+JSON.stringify(response));

                return facebook.me(function(response){
                  console.log("facebook.me callback response"+JSON.stringify(response));
                  var user = {id: response.id, name : response.name, firstname : response.first_name, lastname : response.last_name, bio: response.bio};

                  self.changeUser(user);

                  localstorage.setItem('app_user',self.currentUser);

                  $rootScope.$broadcast('event:login-successfull',{response : self.currentUser});
                
                });
              }

              $rootScope.$broadcast('event:login-error',{response : response});              
            }

            return facebook.login(facebookCallBack);
          break;

          default :
          break;          
        }

        var success = function(response){
          console.log("success callback");

          //handle response and update currentuser then broadcast

          $rootScope.$broadcast('event:login-successfull',{response : self.currentUser});
        }

        var error = function(error){
          console.log("error callback");

        }

        return this.authResource.login({user: self.currentUser}, success, error);
      },
      logout: function(provider) {
        var self = this;

        var success = function(response){
            console.log('logout success callback');

            this.currentUser.clearInfo();
            self.changeUser(self.userService.info);
        }

        var error = function(error){
            console.log('logout error callback');
        }

        return this.authResource.logout({},success,error);
      },
      ping : function(){
        console.log("pinging to see if user is ....");
        var self  = this;

        var success = function(response){
          var output = { id : response.id, name: response.name, firstname:response.firstname, lastname:response.lastname, providers:response.providers, role: self.userRoles.user };

          localstorage.setItem('app_user', output);
          self.changeUser(output);
        }

        var error = function(error){
          // on error then set current user to default value.
          var output = { id : '', name: '',firstname:'',lastname:'',providers:'', role: self.userRoles.public }

          localstorage.removeItem('app_user');
          self.changeUser(output); 
        }

        return this.profileResource.get({ping: true},success,error);
      },
      resetCookie: function(){
        
        localstorage.removeItem('app_user');

        this.currentUser.clearInfo();
        this.changeUser(this.userService.info);

      }
      

  };

  // this should never be used since we're pinging the systeme at startup
  //auth.user = $cookieStore.get('ft_user') || { id : '', name: '',firstname:'',lastname:'',providers:'', role: auth.userRoles.public };

  return auth;

}]);
      

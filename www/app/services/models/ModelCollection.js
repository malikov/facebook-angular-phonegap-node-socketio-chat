'use.strict'

var app = angular.module('FanPhoneChat');

// collection for message list
app.factory('MessageCollection',['Collection','Message',
  function(Collection,Message){

    return function(){
      this = angular.copy(Collection);
      this.model = Message.resource;
    }
  }])

// collection for thread list
app.factory('ThreadCollection',['Collection','Thread',
  function(Collection,Thread){

    return function(){
      this = angular.copy(Collection);
      this.model = Thread.resource;
    }
  }])


// collection for user list
app.factory('UserCollection',['Collection','User',
  function(Collection,User){

    return function(){
      this = angular.copy(Collection);
      this.model = User.resource;
    }

}])

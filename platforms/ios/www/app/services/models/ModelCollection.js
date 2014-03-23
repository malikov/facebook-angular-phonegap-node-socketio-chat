'use.strict'

var app = angular.module('FanPhoneChat');

// collection for message list
app.factory('MessageCollection',['Collection','Message',
  function(Collection,Message){

    var mCollection = new Collection(Message.resource);
    return mCollection;

  }])

// collection for thread list
app.factory('ThreadCollection',['Collection','Thread',
  function(Collection,Thread){

    var tCollection = new Collection(Thread.resource);
    return tCollection;
  }])


// collection for user list
app.factory('UserCollection',['Collection','User',
  function(Collection,User){

    var tCollection = new Collection(User.resource);
    return tCollection;

}])

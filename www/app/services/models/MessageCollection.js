'use.strict'

var app = angular.module('FanPhoneChat');

app.factory('MessageCollection',['$resource','Message',
  function($resource, Message){

    var mCollection = function(){};
    
    mCollection.model = function(){ 
      return Message.resource;
    }

    mCollection.items = [];
    mCollection.busy = false;
    mCollection.itemIndex = 0;

    mCollection.reset = function(){
      this.clearItems();
      this.clearIndex();
    }

    mCollection.itemCount = function(){
      return this.items.length;
    }

    mCollection.clearItems = function(){
      this.items = [];
    }

    mCollection.clearIndex = function(){
      this.itemIndex = 0;
    }

    /*
      params
      filters
    */
    mCollection.loadItems = function(params,filters){
      var self = this;

      var params = params || {i : self.itemIndex, c : self.itemCount()};
      var filters = filters || null;
      
      var success = function(response){
        console.log(response);
        
        for (var i = 0; i < response.length; i++){
          self.items.push(response[i]);
        }
        
        if(response.length > 0)
          self.itemIndex++;

        self.busy = false;
      }
      
      var error = function(){
        // there's been an error when getting next page
        console.log('accentResource queryNextPage error');
      }
      
      if(this.busy)
        return;

      this.busy = true;

      return this.model.getMessages(params,filters,success,error);
    }

    return mCollection;
  }])
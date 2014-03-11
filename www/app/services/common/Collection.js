'use.strict'

var app = angular.module('FanPhoneChat');

app.factory('Collection',[
  function(){

    var collection = function () {
      this.model = {};
      this.items = [];
      this.busy = false;
      this.itemIndex = 0;
    };
    
    collection.reset = function(){
      this.clearItems();
      this.clearIndex();
    }

    collection.itemCount = function(){
      return this.items.length;
    }

    collection.clearItems = function(){
      this.items = [];
    }

    collection.clearIndex = function(){
      this.itemIndex = 0;
    }

    /*
      params
      filters
    */
    collection.loadItems = function(params,filters){
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

      return this.model.getAll(params,filters,success,error);
    }

    return collection;
  }])
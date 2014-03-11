'use.strict'

var app = angular.module('FanPhoneChat');

app.factory('Message',['$resource','localstorage', 
  function($resource,localstorage){
    
    var message = function(){
      this.content = {};
    };

    message.resource = function(){
      // see node server /index.js file for the routing
  		return $resource('api/messages/:id/:threads/:threadId', {messageId : '@id'},
             {
              // GET api/messages
              getAll : {method: 'GET', params: {}, isArray : true},

              // GET api/messages/:id
              getById : {method: 'GET', params: {messageId : '@messageId'}, isArray : false}, 

              // GET api/messages/threads
              groupByThreads : {method: 'GET', params: {threads : 'threads'}, isArray : true},
              
              // GET api/messages/threads/:threadId
              getByThread : {method: 'GET', params: {threads : 'threads', threadId : '@threadId'}, isArray : true}, 
              
              // POST api/messages/threads/:threadId with params message body
              postThreadMessage : {method: 'POST', params: {threads : 'threads', threadId : '@threadId', message : '@message'}, isArray : false},
              
              // POST api/messages with params userId, and recipient
              postUserMessage : {method: 'POST', params: {userId : '@userId', to : '@recipient', message : '@message'}, isArray : false}
             });
    };
    
    message.getById = function(id,success,error){
      var self = this;
      
      var success = success || function(response){
        console.log('getInfo success');
        angular.extend(self.content,response);
      }

      var error = error || function(){
        console.log('getInfo error');

      }

      return this.resource.getById({messageId : id},success,error);
    }

    /*
      filtering options should be either
      nothing then fetch all,
      thread then fetch group by thread,
      thread/id then fetch for a specific id

      params{
        index : index in database
        count : count of current items
      }

    */
    message.getAll = function(params,filters,success,error){
      var filters = filters || null;

      var params.i = params.index || 0;
      var params.c = params.count || 0;
      
      var success = success || function(response){
        console.log('success');
      }

      var error = error || function(error){
        console.log('error');
      }

      switch(filters){
        case 'threads':
          this.resource.groupByThreads({i : params.i, c :params.c},success,error);
        break;

        case 'thread':
          if(params.id == 'undefined')
            return console.log('Error : an id must be provided in order to call getByThread');

          this.resource.getByThread({id : params.id, i : params.i, c :params.c},success,error);
        break;

        default :
          this.resource.getAll({i : params.i, c :params.c},success,error);
      }
    }

    message.post = function(params,filters,success,error){
        var filters = filters || null;
        var params = params || {message : "", threadId : 0, userId : 0};

        var success = success || function(response){
          console.log('success');
        }

        var error = error || function(error){
          console.log('error');
        }

        switch(filters){
          case 'thread':
            

            this.resource.postThreadMessage({threadId : params.threadId, message : params.message},success,error);
          break;

          default : // post to user
            this.resource.postUserMessage({userId : params.userId,message : params.message,recipient : params.recipient},success,error);
        }

      }
  		
  	};

  	return message;
  }])
// Since we kept all of our methods the same as the original datastore we can just replace datastore with remotedatastore and it should work
(function(window){
'use strict';
var App = window.App || {};
var $ = window.jQuery;

function RemoteDataStore(url){
    if (!url){
        throw new Error ('No remote URL supplied.');
    }
    this.serverUrl = url;
}

    RemoteDataStore.prototype.add = function(key,val){
        $.post(this.serverUrl, val, function(serverResponse){
            console.log(serverResponse);
        });
    };

//By passing in a function 'cb' we can get acccess to the serverResponse data that would otherwise only be available inside the body of the callback.
//Then we have access to both the function argument and the server response
    RemoteDataStore.prototype.getAll = function(cb){  
        $.get(this.serverUrl, function(serverResponse){
            console.log(serverResponse);
            cb(serverResponse);
        });
    };

//To retrieve individual object data we need to add to the serverURL with our key and we'll pass it a function again after it we get our response
    RemoteDataStore.prototype.get = function(key, cb){
        $.get(this.serverUrl + '/' + key, function(serverResponse){
            console.log(serverResponse);
            cb(serverResponse);
        })
    }

    RemoteDataStore.prototype.remove = function(key){
        $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
        console.log('Successfully deleted coffee order ' + key);
    };




App.RemoteDataStore = RemoteDataStore;
window.App = App; //Exporting RemoteDataStore to the App space
})(window);
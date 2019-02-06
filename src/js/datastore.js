
//This is a module for storing data, returning data in response to queries, and deleting data
(function(window){ 
    'use strict';
    var App = window.App || {} //If there is already an App property for the window obj you will assign the local App to it otherwise you will create a new empty obj {}.
                               //This is done using the || logical 'or' operator it will create a valid value if window.app hasn't yet been created

    function DataStore() {

        console.log('running the DataStore function');
        this.data = {}; //creating a new 'data' property for our DataStore constructor
    }

    DataStore.prototype.add = function(key, val){ //Adding a property add to your DataStore obj which can be called at anytime
        this.data[key] = val; //Letting you add new properties and their values in a more simplified manner dsOne.add('email', 'james@bond.com');
    }

        DataStore.prototype.get = function(key){ //Lets you use get method of DataStore obj to get return the value of a specified key (dsOne.get(coffee))
            return this.data[key];
        }

        DataStore.prototype.getAll = function(){ //Adds method for DataStore obj to get all keys and value pairs
            return this.data;
        }

        DataStore.prototype.remove = function(key){ //Adds method for DataStore obj to remove property given key arg
            delete this.data[key];
        }
        App.DataStore = DataStore; //Attached datastore to your App obj
        window.App = App; // re=assigned the global app property to your newly defined app
    
})(window);
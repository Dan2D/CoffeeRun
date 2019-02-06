// This is a module for creating orders, delivering orders, and printing orders
(function(window){
    'use strict';
    var App = window.App || {};

    function Truck (truckId, db) { //the db arg will be a new instance of the DataStore so to link the two (var myTruck = App.Truck('007', new App.DataStore());
        this.truckId = truckId; // assigning this instance of a truck it's truckId
        this.db = db;   //assigning this instance of a truck it's database

    }

    Truck.prototype.createOrder = function(order){ //The argument for order is being entered as an object with 
                                                   //an email and coffee property (myTruck.createOrder({emailAddress: 'dr@no.com', coffee: 'decaf'})
        console.log('adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order); //Since we attached our DataStore module to our db, we can use it's add method to add our orders
                                                //We're assigning the key for the add method as the email address and the value as the entire order object
    }

    Truck.prototype.deliverOrder = function(customerId){
        console.log('removing order for ' + customerId);
        this.db.remove(customerId); //Calling on DataStore method of remove and giving it the customerId arg or the email address which is the key in the datastore object
    }

    Truck.prototype.printOrders = function(){
        var customerArray = Object.keys(this.db.getAll());

        console.log('Truck# ' + this.truckId + ' has following pending orders...');
        customerArray.forEach(function(id){
            console.log(this.db.get(id)); //Inside a callback function, 'this' is not assigned, even though it is still within the truck object, we need to assign or bind 'this'
        }.bind(this));                    //By adding the bind property to the forEach call we are telling the callback function to rerun using our argument as the this object
                                          // which in this case is our this which refers to our current truck instance
                                                  

    }

    App.Truck = Truck;
    window.App = App;
})(window);
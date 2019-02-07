//Initializes the formhandler and links the submitted form data to the truck
(function(){
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler; //We are importing our modules to local variables here
    var CheckList = App.CheckList;
    var myTruck = new Truck('nc-1704', new DataStore());
    window.myTruck = myTruck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR); // creating a new instance of formhandler and auto assigning the form element so you don't have to type it into the console


    formHandler.addSliderHandler();
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck), myTruck.db);  //When user clicks cbox it also fires the deliverOrder method with instance of myTruck

  
       

    // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck)); //Auto adding submit handler, it can access the method bc it created the object from FormHandler
    console.log(formHandler);                                        //passing our handler to our truck module and creating the order with the instance of our truck
                                                                    // using the bind method and passing the creat order all of our data from the form
    formHandler.addSubmitHandler(function(data){   //Get data object from the formHandler
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    })

})(window);
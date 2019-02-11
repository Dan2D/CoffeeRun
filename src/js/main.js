//Initializes the formhandler and links the submitted form data to the truck
(function () {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler; //We are importing our modules to local variables here
    var webshim = window.webshim;
    var Validation = App.Validation;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var CheckList = App.CheckList;
    var myTruck = new Truck('nc=1704', remoteDS);
    // var myTruck = new Truck('nc-1704', new DataStore()); Offline datastore
    window.myTruck = myTruck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR); // creating a new instance of formhandler and auto assigning the form element so you don't have to type it into the console


    formHandler.addSliderHandler();
    formHandler.addInputHandler(Validation.isEmail);
    // formHandler.addInputHandler(function (remoteDS) {
    //     Validation.isEmail;
    //     Validation.isDuplicateEmail(remoteDS);
    // });




    //We've imported our Validation module and assigned it to a local var, through formHandler we access addInputHandler through
    //and through our validation import we access the object property isCompanyEmail which is a function which will serve as the function
    // in the addInputHandler parameter fn

    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck), myTruck.db); //When user clicks cbox it also fires the deliverOrder method with instance of myTruck




    // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck)); //Auto adding submit handler, it can access the method bc it created the object from FormHandler
    console.log(formHandler); //passing our handler to our truck module and creating the order with the instance of our truck
    // using the bind method and passing the creat order all of our data from the form
    formHandler.addSubmitHandler(function (data) { //Get data object from the formHandler
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    })

    //Adding webshims API to handle safari browser validations
    webshim.polyfill('forms forms-ext');
    webshim.setOptions('forms', {
        addValidators: true,
        lazyCustomMessages: true
    });

})(window);
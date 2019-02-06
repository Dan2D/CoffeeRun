//This is a module for collecting user data from our form and creating data objects with it
(function(){
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector){
        if (!selector) {
            throw new Error('No Selector Provided!');
        }
        this.$formElement = $(selector);
        if (this.$formElement === 0){
            throw Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSliderHandler = function(){
        let sliderval = document.querySelector("#rangeval");
        $("#strengthLevel").on('input', function(){
            $("#rangeval").css({'right': (this.value/10)+8 + 'px', 'margin-left':  this.value + '%', 'color': 'rgb(' + 5.1*this.value + ',255,50)', 'visibility': 'visible'});
            if (this.value > 50){
                $('#rangeval').css({'color': 'rgb(255,' + (510-(5.1*this.value)) + ',50)'})
            }
            sliderval.innerText = this.value;
            // console.log(this.position());
        })
        $("#strengthLevel").on('mouseup', function(){
            $("#rangeval").css({'visibility': 'hidden'})
        })
    }

    FormHandler.prototype.addSubmitHandler = function(fn){
        console.log('Setting Submit Handler for Form');
        this.$formElement.on('submit', function(event){ //Selecting the form element or [data-coffe-order="form"]
            event.preventDefault();

            var data = {}; //creating an empty object
            $(this).serializeArray().forEach(function(item){    //serializeArray is a jQuery method that becomes available to jQuery wrapped objects ($(this))
                data[item.name] = item.value;                   //for each 'item' in the array assigning the name as a data property for each array item and assigning it's value to that key
                console.log(item.name + ' is ' + item.value);
            });                                 
            console.log(data);
            fn(data); //This allows us to call a function when we call our addSubmitHandler, we can then link our data object as an arg for that function.
                      //Which we do in our main.js passing the function myTruck.createOrder.bind(myTruck)
            this.reset();
            this.elements[0].focus();
        })
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
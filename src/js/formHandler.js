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

    //Checks if coffee is decaf and has caffeine strength greater than 20
     function decafCheck (string, int){
        if (string.toLowerCase().indexOf('decaf') !== -1 && int > 20){ //indexOf returns -1 if the substr is not found
            return false;
        }
        else { return true;}
    }


    FormHandler.prototype.addInputHandler = function(fn){
        console.log('Setting input handler for Form...');

        this.$formElement.on('input', '[name="emailAddress"]', function(event){
            var email = event.target.value;
            if(fn(email)){
                $(event.target).setCustomValidity(''); //wrapping event.target in jquery to allow for webshims API to work on safari browser
            }
            else {
                let message = email + " is not an authorized email address!";
                $(event.target).setCustomValidity(message);

            }
        })

        this.$formElement.on('input', '[name="coffee"]', function(event){
            let coffee = event.target.value;
            let caff = $('input[name="strength"]').val();
            if (decafCheck(coffee, caff) ){
                $(event.target).setCustomValidity('');
            }
            else {
                
                let message = coffee  + " cannot be decaf with a caffeine strength above 20!"
                $(event.target).setCustomValidity(message);
            }
        })

        this.$formElement.on('input', '[name="strength"]', function(event){
            let caff = event.target.value;
            let coffee = $('input[name="coffee"]').val();
            if (decafCheck(coffee, caff) ){
                $('input[name="coffee"]')[0].setCustomValidity(''); //Using [0] to get out of jQuery syntax so I can use javascript commands again
            }
            else {
                
                let message = coffee  + " cannot be decaf with a caffeine strength above 20!"
                $('input[name="coffee"]')[0].setCustomValidity(message);
            }
        })

    }

    FormHandler.prototype.addSliderHandler = function(){
        let sliderval = document.querySelector("#rangeval");
        $("#strengthLevel").on('input', function(){
            //From 0-50 changing rgb from green to yellow, moving value with slider, and changing visibility
            $("#rangeval").css({'right': (this.value/10)+8 + 'px', 'margin-left':  this.value + '%', 'color': 'rgb(' + 5.1*this.value + ',255,50)', 'visibility': 'visible'});
            //From 50-100 changing rgb from yellow to red
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
            event.preventDefault(); //preventing the form from being submitted to the server

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
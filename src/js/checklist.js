(function(window){
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector){
        if(!selector){
            throw new Error('No selector provided!');
        }
        
        this.$element = $(selector); //$element has no special meaning just following convention we used in other constructors below such as $div
        if (this.$element.length === 0){
            throw new Error('Could not find element with selector: ' + selector);
        }


        CheckList.prototype.addClickHandler = function(fn){
            this.$element.on('click', 'input', function(event){
                var email = event.target.value; //Since the checkboxes are assigned a value of the emailaddress, this will give us back the email address of the clicked cbox
                this.removeRow(email);
                fn(email);
            }.bind(this)); //addClickHandler is binding the context object of the event handler function
            // this.$element.on('dblclick', 'input', function(event){
            //     var form = $('[data-coffee-order="form"]');
            //     editForm(form);

            // })
        }

        // CheckList.prototype.addDblClickHandler = function(data){
        //     this.$element.on('dblclick', function(event){
        //         let email = event.target.value;
        //     })
        // }

        // CheckList.prototype.editOrder = function(data){
        //     $('input[name="emailAddress"]').value = this

        // }

        CheckList.prototype.addRow = function(coffeeOrder){ //we will pass in coffeeOrder which is our data object with all the orders key/value pairs
            //First thing addRow does is remove any previous rows that are under the same emailAddress as the new row being added to avoid overwriting
            this.removeRow(coffeeOrder.emailAddress);
            //Create a new instance of a row using the coffeeOrder data
            var rowElement = new Row(coffeeOrder);

            //add the new row instance's $element property to the checklist
            this.$element.append(rowElement.$element);
        }

        CheckList.prototype.removeRow = function(email){
            this.$element                   //using $element instance property b/c the checklist div is assigned to it
            .find('[value="' + email + '"]') //returns first element in array where criteria is found to be true
            .closest('[data-coffee-order="checkbox"]') //Finds closest inclusive ancestor that matches criteria
            .remove();
        }


        function Row(coffeeOrder){
            var $div = $('<div></div>', {       //Jquery is allowing us to create elements and takes 2 args, 1st is the element tag, 2nd is an object with attribs that Jquery will assign
                'data-coffee-order': 'checkbox',
                'class': 'checkbox'
            });
            var $label = $('<label></label>');
            var $checkbox = $('<input></input>', {
                type: 'checkbox',
                value: coffeeOrder.emailAddress //because none of these use special chars like '-' or JS var names like 'class' we don't need to put them in quotes
            });
            var description = coffeeOrder.size + ' ';
                if (coffeeOrder.flavor){
                    description += coffeeOrder.flavor + ' ';
                }

                description += coffeeOrder.style + ' ';
                description += coffeeOrder.coffee + ', ';
                description += ' (' + coffeeOrder.emailAddress + ' )';
                description += ' [' + coffeeOrder.strength + 'x]';

                $label.append($checkbox);
                $label.append(description);
                $div.append($label);

                this.$element = $div; // Instead of calling the function to create a subtree, we are making it available as a property of the instance 'this'
        }


    }

    App.CheckList = CheckList;
    window.App = App;

})(window);
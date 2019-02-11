(function(window){
    'use strict';
    var App = window.App || {};

    var Validation = {
        isEmail: function(email){
            return /^[\w-\.]+@([\w]+\.)+[\w-]{2,}$/.test(email); //The pattern for a literal regex goes between the "//" 
                                                        //You specify the string contains one or more chars (.+), the \. treats the period as a normal period
                                                        //The $ at the end of the expression says no more chars should come after this string
                                                        //The.test(email) returns a boolean value based on the parameter email you enter
        }
        // ,
        // isDuplicateEmail: function(server, email){
        //     server.get(email, function(){
        //         console.log('test');
        //     })
        // }

    };


App.Validation = Validation;
window.App = App;
})(window);
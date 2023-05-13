/**
    This is one of the multiple user interfaces that the application could have.
    User interfaces translate user actions into operations over the system through the specific interface.
    
    The user wants to sum two numbers and we translate that into the instantiation and usage of the calculator.
    An http-api user interface would translate the same action into an http call.
**/

const Calculator = require("./calculator")

module.exports = function(){

    const calculator = Calculator()
    return Object.freeze({
        sum
    })

    function sum(a, b){
        return calculator.sum(a,b)
    }
}

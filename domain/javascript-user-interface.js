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

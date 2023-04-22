module.exports = function(user_interface){
    return Object.freeze({
        sum
    })

    async function sum(a, b){
        return await user_interface.sum(a, b)
    }
}

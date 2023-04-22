const axios = require('axios');

module.exports = function(){
    return Object.freeze({
        sum
    })

    async function sum(a, b){
        const response = await axios.get(`http://localhost:3000/sum?a=${a}&b=${b}`);
        return response.data
    }
}

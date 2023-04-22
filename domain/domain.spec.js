const test_all = require('./test-cases/all')
const domain_user_interface = require('./javascript-user-interface')()

describe('Domain tests', function(){
    test_all(domain_user_interface)
})

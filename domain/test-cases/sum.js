const {expect} = require('chai');
const User = require('./test-user.js');

module.exports = function(user_interface){
    describe('sum', function(){
        let user

        this.beforeEach(async function(){
            user = User(user_interface)
        })

        it('basic sum', async () => {
            let result = await user.sum(1,2)
            expect(result).to.equal(3);
        });


        it('sum property based'); //https://github.com/dubzzz/fast-check/blob/main/packages/fast-check/documentation/Arbitraries.md#combinators
    })
}

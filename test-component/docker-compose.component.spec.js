const {expect} = require('chai');
const uuid = require('uuid');
const axios = require('axios');
const runCommand = require('./runCommand');
const container_test_cases = require('./container-test-cases');

describe('Docker compose container test', function () {
  this.timeout(300000);

    async function startApp(containerId){
        await runCommand(`export CONTAINER_NAME=${containerId} && docker-compose up -d --build --wait`, `composed application ${containerId}`)
    }

    async function removeApp(containerId){
        await runCommand(`export CONTAINER_NAME=${containerId} && docker-compose down`, `application removed ${containerId}`)
    }

  before(async () => { //beforeAll
    this.containerId = uuid.v4()
    await startApp(this.containerId)
  });

  after(async () => { //afterAll
    await removeApp(this.containerId)
  });

  container_test_cases();

  //TODO: use functional test cases with an http api interface
  it('should say hello world', async () => {
    const response = await axios.get('http://localhost:3000/helloworld');
    expect(response.data).to.equal('Hello World!');
  });
});

const { exec } = require('child_process');
const {expect} = require('chai');
const uuid = require('uuid');
const axios = require('axios');

describe('Docker compose container test', function () {
  this.timeout(300000);

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    async function runCommand(command, reason){
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout) => {
                if (error) return reject(error)
                console.log(reason)
                //console.log(stdout)
                resolve();
              });
        })
    }

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

  //TODO: Could be that docker-compose is not installed in github actions?

  it('should build and run the container', () => {});

  it('should run containers in parallel')

  xit('play with the container before removing it', async () => {
    console.log("container deployed")
    await delay(60000)
  });

  it('container is up and running', async () => {
    await runCommand(`curl http://localhost:3000/health`, 'api is healthy')
  });

  it('should say hello world', async () => {
    const response = await axios.get('http://localhost:3000/helloworld');
    expect(response.data).to.equal('Hello World!');
  });
});

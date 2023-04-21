const { exec } = require('child_process');
const {expect} = require('chai');
const uuid = require('uuid');
const axios = require('axios');

describe('Docker container test', function () {
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

    async function buildImage(){
        await runCommand('docker build -t auto-test-image -f ./http-api/Dockerfile .', 'built image auto-test-image')
    }

    async function runContainer(containerId){
        await runCommand(`docker run -d -p 3000:3000 --name ${containerId} auto-test-image`, `created container ${containerId}`)
        await delay(1000) //TODO add this wait to the create command
        // await runCommand(`docker logs ${containerId}`, `logs for container ${containerId}: \n`) //TODO: show the logs and fail in case there are errors
    }

    async function removeContainer(containerId){
        await runCommand(`docker rm -f ${containerId}`, `removed container ${containerId}`)
    }

  before(async () => { //beforeAll
    this.containerId = uuid.v4()
    await buildImage()
    await runContainer(this.containerId)
  });

  after(async () => { //afterAll
    await removeContainer(this.containerId)
  });

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

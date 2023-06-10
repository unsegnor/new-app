const uuid = require('uuid');
const container_test_cases = require('./container-test-cases');
const runCommand = require('./runCommand');
const programmer = require('./programmer');
const delay = require('./delay');
const domain_tests = require('../domain/test-cases/all.js');
const application_name = require('../package.json').name;
const domain_name = require('../package.json').domain;

const Http_user_interface = require('./http-api-user-interface')

describe('HttpApi deployment test', function () {
  this.timeout(300000);
  let http_user_interface;
  let baseUrl;

  before(async () => { //beforeAll
    this.applicationName = uuid.v4()
    baseUrl = `https://test-${this.applicationName}.${domain_name}`
    http_user_interface = new Http_user_interface({baseUrl})

    await programmer.deployHttpApi(this.applicationName)    
  });

  after(async () => { //afterAll
    await programmer.removeHttpApi(this.applicationName)
  });

  container_test_cases({baseUrl});

  //TODO: pass a testscenario with preArrange, postArrange, preAct, postAct, preAssert, postAssert methods
  domain_tests(http_user_interface);
});


//TODO: todos estos tests tienen la misma estructura:
// 1. deploy
// 2. test
// 3. remove

//en realidad lo que estamos comprobando es la capacidad de desplegar
//queremos llamar a un método "desplegar" y que cuando termine, la aplicación esté desplegada

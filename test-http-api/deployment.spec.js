const uuid = require('uuid');
const container_test_cases = require('./container-test-cases');
const runCommand = require('./runCommand');
const deployment = require('./deployment');
const delay = require('./delay');
const domain_tests = require('../domain/test-cases/all.js');
const application_name = require('../package.json').name;
const domain_name = require('../package.json').domain;
const baseUrl = `https://${application_name}.${domain_name}`
const http_user_interface = require('./http-api-user-interface')({baseUrl})

describe('HttpApi deployment test', function () {
  this.timeout(300000);

  /*before(async () => { //beforeAll
    this.applicationId = uuid.v4()
    await deployment.deployHttpApi(this.applicationId)
  });

  after(async () => { //afterAll
    await deployment.removeHttpApi(this.applicationId)
  });
*/
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

const uuid = require('uuid');
const container_test_cases = require('./container-test-cases');
const runCommand = require('./runCommand');
const delay = require('./delay');
const domain_tests = require('../domain/test-cases/all.js');
const baseUrl = "http://localhost:3000"
const http_user_interface = require('./http-api-user-interface')({baseUrl})
const programmer = require('./programmer')()

describe('Docker container test', function () {
  this.timeout(300000);

  before(async () => { //beforeAll
    this.applicationId = uuid.v4()
    programmer.deploy({applicationId: this.applicationId})
  });

  after(async () => { //afterAll
    programmer.remove({applicationId: this.applicationId})
  });

  container_test_cases({baseUrl});

  //TODO: pass a testscenario with preArrange, postArrange, preAct, postAct, preAssert, postAssert methods
  domain_tests(http_user_interface);
});

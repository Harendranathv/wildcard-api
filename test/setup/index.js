process.on('unhandledRejection', err => {throw err});

const assert = require('reassert');
global.assert = assert;

const WildcardApi = require('../../server/WildcardApi');
const WildcardClient = require('../../client/WildcardClient');
const {parse, stringify} = require('../../client/serializer');
const makeHttpRequest = require('../../client/makeHttpRequest');

const bundle = require('./browser/bundle');
const launchBrowser = require('./browser/launchBrowser');

const startServer = require('./startServer');

const {symbolSuccess, symbolError} = require('@brillout/cli-theme');

(async () => {
  await bundle();

  const wildcardApiHolder = {};
  const server = await startServer(wildcardApiHolder);

  const {browserEval, browser} = await launchBrowser();

  for(let {test, file} of getTests()) {
    const wildcardApi = WildcardApi();

    Object.assign(wildcardApiHolder, {wildcardApi});

    const wildcardClient = new WildcardClient({wildcardApi, makeHttpRequest, stringify, parse});

    const testName = test.name+' ('+file+')';

    try {
      await test({wildcardApi, wildcardClient, browserEval});
    } catch(err) {
      console.log(symbolError+'Failed test: '+testName);
      throw err;
    }

    console.log(symbolSuccess+testName);
  }

  await browser.close();

  await server.stop();
})();

function getTests() {
  const glob = require('glob');
  const path = require('path');

  const projectRoot = __dirname+'/..';

  const testFiles = glob.sync(projectRoot+'/tests/*.js');
  const tests = [];
  testFiles.forEach(filePath => {
    require(filePath).forEach(test => {
      const file = path.relative(projectRoot, filePath);
      tests.push({test, file})
    });
  });

  return tests;
}

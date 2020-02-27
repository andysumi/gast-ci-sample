/* global GasTap, sayHello */

/*
  参考
  - https://medium.com/effilab/how-to-perform-google-add-on-automated-unit-testing-and-publishing-with-circle-ci-part-2-636c7589350e
  - https://qiita.com/jiroshin/items/dcc398285c652554e66a
*/

function gastTestRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  var log = '';
  var loggerFunc = function (msg) { log += msg + '\n';};

  var test = new GasTap({
    logger: loggerFunc
  });

  var url = 'https://docs.google.com/spreadsheets/d/1wqmI2TsJDuSIRt3Kg4A1nfO9HRZVQDsXbg2uIxPlGfU/edit#gid=0';
  var ss = SpreadsheetApp.openByUrl(url);
  SpreadsheetApp.setActiveSpreadsheet(ss);

  testSayHello(test);

  test.finish();

  return { failures: test.totalFailed(), log: log };
}

function testSayHello(test) { // eslint-disable-line no-unused-vars
  test('sayHello writes Hello in the top-left cell', function (t) {
    sayHello();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var cell = ss.getActiveSheet().getRange('A1');
    var value = cell.getValue();
    t.equal(value, 'Hello', 'it writes Hello');
  });
}

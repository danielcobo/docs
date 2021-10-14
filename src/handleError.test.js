const err = require('./handleError.js');
const process = require('process');
const chalk = require('chalk');

test('Test handleError.js', function () {
  //Borrowed from: https://stackoverflow.com/a/50387948
  const spy = jest.spyOn(console, 'log');
  jest.spyOn(process, 'exit').mockImplementationOnce(() => {
    throw new Error('process.exit() was called.');
  });
  const errMsg = 'Everyone fails sometime';
  const mockErr = 'Log, learn and move on';
  expect(() => {
    const errHandler = err(errMsg);
    errHandler(new Error(mockErr));
  }).toThrow('process.exit() was called.');
  const log = spy.mock.calls[0][0].split('\n');
  expect(log[0]).toStrictEqual(chalk.red(errMsg));
  expect(log[1]).toStrictEqual(chalk.red('Error: ' + mockErr));
  expect(process.exit).toHaveBeenCalledWith(1);
});

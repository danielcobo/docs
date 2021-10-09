const readPaths = require('./readPaths.js');
const fs = require('@danielcobo/fs');
const path = require('path');

test('Test readPaths.js', async function () {
  const all = await fs.read('./src/');
  const expectedPaths = all.files
    .filter(function (file) {
      return !/\.test\.js$/.test(file);
    })
    .map(function (file) {
      return path.resolve(file);
    });

  const paths = await readPaths();

  expect(paths).toStrictEqual(expectedPaths);
});

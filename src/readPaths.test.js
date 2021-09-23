const readPaths = require('./readPaths.js');
const fs = require('@danielcobo/fs');
const path = require('path');

test('Test readPaths.js', async function () {
  const all = await fs.read('./src/');
  const expectedPaths = all.files.map(function (file) {
    return path.resolve(file);
  });

  const paths = await readPaths();

  expect(paths).toStrictEqual(expectedPaths);
});

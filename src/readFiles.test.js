const readFiles = require('./readFiles.js');
const fs = require('@danielcobo/fs');
const process = require('process');
const path = require('path');

test('Test readFiles.js', async function () {
  const path = './src/readPaths.js';

  const files = await readFiles([path]);
  const expectedFiles = [{ path: path, content: await fs.read(path) }];

  expect(files).toStrictEqual(expectedFiles);
});

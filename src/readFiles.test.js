const readFiles = require('./readFiles.js');
const fs = require('@danielcobo/fs');
const process = require('process');
const path = require('path');

test('Test readFiles.js', async function () {
  const all = await fs.read('./src/');
  const filepaths = all.files.map(function (file) {
    return process.cwd() + path.sep + file;
  });
  const contents = await Promise.all(
    filepaths.map(function (filepath) {
      return fs.read(filepath);
    })
  );
  const expectedFiles = filepaths.map(function (path, i) {
    return { path: path, content: contents[i] };
  });

  const files = await readFiles();

  expect(files).toStrictEqual(expectedFiles);
});

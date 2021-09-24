const readPaths = require('./readPaths.js');
const fs = require('@danielcobo/fs');

/**
 * Read relevant files
 * @private
 */
const readFiles = async function readFiles() {
  const paths = await readPaths();
  const contents = await Promise.all(
    paths.map(function (filepath) {
      return fs.read(filepath);
    })
  );

  const files = paths.map(function (path, i) {
    return { path: path, content: contents[i] };
  });

  return files;
};

module.exports = readFiles;

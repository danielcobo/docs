const readPaths = require('./readPaths.js');
const fs = require('@danielcobo/fs');

/**
 * @typedef {Object} RawFile
 * @private
 * @property {string} path - filepath
 * @property {string} content - content string
 */

/**
 * Read files and return an array of RawFile objects
 * @private
 * @param {Array.String} paths
 * @returns {RawFile}
 */
const readFiles = async function readFiles(paths) {
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

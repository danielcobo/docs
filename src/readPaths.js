const fs = require('@danielcobo/fs');
const process = require('process');
const micromatch = require('micromatch');
const path = require('path');

/**
 * Returns paths of all relevant files
 * @private
 */
const readPaths = async function getPaths() {
  //Read tree
  const absoluteCurrentPath = process.cwd();
  //const currentPath = path.basename(absoluteCurrentPath);
  const tree = await fs.read(absoluteCurrentPath);

  //Filter by glob
  const globs = [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/reports/**',
    '!**/.stryker-tmp/**',
  ];
  const paths = micromatch(tree.files, globs);

  //Glob module normalizes path separators to /,
  //so we revert to default using path.normalize
  return paths.map(function (p) {
    return path.normalize(p);
  });
};

module.exports = readPaths;

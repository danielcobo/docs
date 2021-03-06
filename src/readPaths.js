const fs = require('@danielcobo/fs');
const process = require('process');
const micromatch = require('micromatch');
const path = require('path');

/**
 * Returns paths of all relevant files
 * @private
 */
module.exports = async function readPaths() {
  //Read tree
  const absoluteCurrentPath = process.cwd();
  //const currentPath = path.basename(absoluteCurrentPath);
  const tree = await fs.read(absoluteCurrentPath);

  //Filter by glob
  const globs = [
    '**/*.js',
    '!**/*.test.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/reports/**',
    '!.stryker-tmp/**',
  ];
  const paths = micromatch(tree.files, globs, { dot: true });

  //Glob module normalizes path separators to /,
  //so we revert to default using path.normalize
  return paths.map(function (p) {
    return path.normalize(p);
  });
};

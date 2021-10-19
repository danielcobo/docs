const fs = require('@danielcobo/fs');
const readPaths = require('./readPaths.js');
const readFiles = require('./readFiles.js');
const parseComments = require('./parseComments.js');
const parseTemplate = require('./parseTemplate.js');
const err = require('@danielcobo/err');

module.exports = async function docs() {
  //Prepare data
  const paths = await readPaths().catch(err('Could not read paths:'));
  const files = await readFiles(paths).catch(err('Could not read files:'));
  const pkgJSON = await fs
    .read('package.json')
    .catch(err('Could not read package.json:'));
  const pkg = JSON.parse(pkgJSON);
  const definitions = await parseComments(files, pkg.name).catch(
    err('Could not parse comment data:')
  );
  /**
   * @typedef {Object} Data
   * @public
   * @property {Array.Definition} definition - Definition object
   * @property {Package} repo - object of package.json data
   */
  const data = {
    definition: definitions,
    repo: pkg,
  };

  //Parse & write
  const license = await parseTemplate(data, 'LICENSE.hbs').catch(
    err('Could not parse LICENSE.hbs')
  );
  const readme = await parseTemplate(data, 'README.hbs').catch(
    err('Could not parse README.hbs')
  );
  await fs.mk('./LICENSE.md', license).catch(err('Could not write LICENSE.md'));
  await fs.mk('./README.md', readme).catch(err('Could not write README.md'));
};

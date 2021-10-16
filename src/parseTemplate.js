const path = require('path');
const absoluteCurrentPath = process.cwd();
const fs = require('@danielcobo/fs');
const Handlebars = require('handlebars');
Handlebars.registerHelper('noscope', function (repoName) {
  if (repoName !== undefined) {
    return repoName.slice(repoName.indexOf('/') + 1);
  }
});
Handlebars.registerHelper('nogit', function (gitURL) {
  if (gitURL !== undefined) {
    return gitURL.slice(gitURL.indexOf('+') + 1).replace(/\.git$/, '');
  }
});

/**
 * Parse templates using data
 * @param {Object} data - definitions array and ._repo object
 * @param {string} templateFile - template filename
 */
module.exports = async function parseTemplate(data, templateFile) {
  const templatePath = path.join(absoluteCurrentPath, templateFile);
  let template = await fs.read(templatePath).catch(function (err) {
    //Throw if error is NOT a missing template
    if (!/^ENOENT: no such file or directory, stat /.test(err.message)) {
      throw err;
    }
  });
  if (!template) {
    const boilerplate = path.join(__dirname, '../boilerplate/', templateFile);
    template = await fs.read(boilerplate);
    await fs.mk(templatePath, template);
  }

  Handlebars.registerHelper('typecode', function (types) {
    return types
      .split('|')
      .map(function (type) {
        const typeName = type
          .slice(type.lastIndexOf('.') + 1)
          .replace(/[<>\[\]]/g, '') //Account for Object[], Array.<Object>, Array.Object
          .toLowerCase();
        const typedef = data.definition.find(function (def) {
          return def.isTypedef && def.name.toLowerCase() === typeName;
        });
        let typecode = '`' + type + '`';
        if (typedef) {
          typecode =
            `[${typecode}]` +
            `(#${typedef.name}--${typedef.type})`.toLowerCase();
        }
        return typecode;
      })
      .join('|');
  });

  const parser = Handlebars.compile(template);
  return parser(data);
};

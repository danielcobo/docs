const commentParser = require('comment-parser');
const path = require('path');

/**
 * @typedef {Object} Comment
 * @private
 * @property {string} description - type/function/ect. description text
 * @property {Array.RawSource} source - for Source see https://www.npmjs.com/package/comment-parser
 * @property {Array.RawTag} tags - tags are things like parameters, returns, etc.
 * @property {Array.Problem} problem - for Problem see https://www.npmjs.com/package/comment-parser
 */

/**
 * @typedef {Object} RawTag
 * @property {string} tag - tag type
 * @property {string} name - tag name
 * @property {string} type - tag data type
 * @property {boolean} optional - tag data type
 * @property {*} default - default value
 * @property {string} description - tag description
 * @property {Array.Problem}
 * @property {Array.RawSource}
 */

/**
 * Returns true if comment is public
 * @param {Comment} comment
 * @returns {boolean} - returns true/false if comment is public
 */
const isPublic = function isPublic(comment) {
  return (
    comment.tags.find(function (tag) {
      return tag.tag.toLowerCase() === 'public';
    }) !== undefined
  );
};

/**
 * Cleans and formats description text
 * @param {string} description - description text
 * @returns {string} - clean and formatted description text
 */
const cleanDescription = function cleanDescription(description) {
  const des = description.replace(/^\s*-\s*/, '').replace(/\s*$/, '');
  return des[0].toLocaleUpperCase + des.slice(1);
};

/**
 * Get description of the whole comment
 * Example: function description
 * @param {Comment} comment
 * @returns {string}
 */
const getDescription = function getDescription(comment) {
  let description = comment.description;
  const typedef = tags.find((tag) => tag.tag.toLowerCase() === 'typedef');
  if (typedef && typedef.description) {
    description = typedef.description;
  }
  return cleanDescription(description);
};

/**
 * @typedef {Object} Tag
 * @property {string} name - tag name
 * @property {string} type - tag data type
 * @property {boolean} optional - tag data type
 * @property {*} default - default value
 * @property {string} description - tag description
 */

/**
 * Clean and format tags
 * @param {Array.RawTag} tags - raw tags from comment parser
 * @param {string} tagName - param or property
 * @returns {Array.Tag}
 */
const cleanTags = function cleanTags(tags, tagName) {
  return tags
    .filter((tag) => tag.tag.toLowerCase() === tagName)
    .map((tag) => ({
      name: tag.name,
      type: tag.type,
      description: cleanDescription(tag.description),
      optional: tag.optional,
      default: tag.default,
    }));
};

/**
 * @typedef {Object} Param - function parameter
 * @property {string} name - parameter name
 * @property {string} type - argument data type
 * @property {string} description - parameter description
 * @property {boolean} optional - true/false if parameter is optional
 * @property {*} default - default argument value
 */

/**
 * Get all parameters
 * @param {Array.RawTag} tags
 * @returns {Array.Param}
 */
const getParams = function getParams(tags) {
  return cleanTags(tags, 'param');
};

/**
 * @typedef {Object} Property - type definition property
 * @property {string} name - property name
 * @property {string} type - property value data type
 * @property {string} description - property description
 * @property {boolean} optional - true/false if property is optional
 */

/**
 * Get all properties
 * @param {Array.RawTag} tags
 * @returns {Array.Property}
 */
const getProperties = function getProperties(tags) {
  return cleanTags(tags, 'param').map(function (tag) {
    delete tag.default;
    return tag;
  });
};

/**
 * @typedef {Object} ReturnValue
 * @property {string} type - data type of return value
 * @property {string} description - description of return value
 */

/**
 * Get return value
 * @param {Arrray.RawTag} tags
 * @returns {ReturnValue}
 */
const getReturns = function getReturns(tags) {
  tag = tags.find((tag) => tag.tag.toLowerCase() === 'returns');
  return {
    type: tag.type,
    description: cleanDescription(tag.description),
  };
};

/**
 * @typedef {Object} Source
 * @property {number} line - source line number
 * @property {string} path - source file path
 */

/**
 * @typedef {Object} Definition
 * @property {string} description - type/function description text
 * @property {string} name - type/function name
 * @property {Array.Param} param - function parameters
 * @property {Array.Property} property - type/function properties
 * @property {ReturnValue} returns - function return value
 * @property {Array.Source} source - type/function definition source
 */

/**
 * Get all definitions
 * @param {Array.RawFile} files - source file objects
 * @param {string} packageName - package name from package.json
 * @returns {Array.Definition} - array of all definitions
 */
module.exports = function parseComments(files, packageName) {
  const definitions = [];

  files.map(function (file) {
    const filename = path.basename(file.path);
    const comments = commentParser.parse(file.content);

    let impliedName = [];
    comments
      .filter(function (comment) {
        return isPublic(comment);
      })
      .map(function (comment) {
        let source = {
          path: file.path,
          line: comment.source[0].number + 1,
        };

        let name;
        const alias = tags.find((tag) => tag.tag.toLowerCase() === 'alias');
        const typedef = tags.find((tag) => tag.tag.toLowerCase() === 'typedef');
        if (alias && alias.name) {
          name = alias.name + '()';
        } else if (typedef && typedef.name) {
          name = typedef.name;
        } else {
          impliedName.push(comment);
          if (filename === 'index') {
            name = packageName + '()';
          } else {
            name = filename + '()';
          }
        }

        definitions.push({
          description: getDescription(comment),
          name: name,
          param: getParams(comment.tags),
          property: getProperties(comment.tags),
          returns: getReturns(comment.tags),
          source: source,
        });
      });

    if (impliedName.length > 1) {
      throw new Error(`
        There can only be 1 implied name per file.\n\r 
        Already implied:\n\r
        File: ${file.path}\n\r
        Line: ${impliedName[0].source[0].line}`);
    }
  });

  return definitions;
};

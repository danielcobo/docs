const commentParser = require('comment-parser');

/**
 * @typedef {Object} Tag
 * @private
 * @property {string} tag - tag type
 * @property {string} name - tag name
 * @property {string} type - tag data type
 * @property {boolean} optional - tag data type
 * @property {*} default - default value
 * @property {string} description - tag description
 */

/**
 * @typedef {Object} Source
 * @private
 * @property {number} line - source line number
 * @property {string} path - source file path
 */

/**
 * @typedef {Object} Comment
 * @private
 * @property {string} description - type/function/ect. description text
 * @property {Array.Source} source - array of source objects
 * @property {Array.Tag} tags - tags are things like parameters, returns, etc.
 */

/**
 * Reutrn an array of FileComment objects
 * @param {Array.RawFile} files - source file objects
 * @returns {Array.Comment} - array of all comments
 */
module.exports = function parseComments(files) {
  const comments = [];
  files.map(function (file) {
    commentParser.parse(file.content).map(function (comment) {
      comment.description = comment.description
        .replace(/^\s*-\s*/, '')
        .replace(/\s*$/, '');
      //Remove problems
      delete comment.problems;
      //Simplify source
      comment.source = {
        path: file.path,
        line: comment.source[0].number + 1,
      };
      //Clean tags
      comment.tags.map(function (tag) {
        tag.description = tag.description
          .replace(/^\s*-\s*/, '')
          .replace(/\s*$/, '');
        delete tag.source;
        delete tag.problems;
        if (tag.tag.toLowerCase() === 'private') {
          comment.private = true;
        }
        return tag;
      });

      comments.push(comment);
    });
  });
};

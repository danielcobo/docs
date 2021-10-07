const parseComments = require('./parseComments.js');

test('Test parseComments.js - description', function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].description).toStrictEqual('Function description');
});

test('Test parseComments.js - description by typedef', function () {
  const content = `
  /**
   * @typedef Book - a book type
   * @public
   * @param {number} pages - number of pages
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].description).toStrictEqual('A book type');
});

test('Test parseComments.js - source', function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].source).toStrictEqual({
    path: './every/path/starts/with/a/single/step',
    line: 2,
  });
});

test('Test parseComments.js - properties', function () {
  const content = `
  /**
   * @typedef {Object} Source
   * @public
   * @property {number} lnnumber - source line number
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].property).toStrictEqual([
    {
      description: 'Source line number',
      name: 'lnnumber',
      optional: false,
      type: 'number',
    },
  ]);
});

test('Test parseComments.js - returns', function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].returns).toStrictEqual({
    type: 'number',
    description: 'Number of numbers',
  });
});

test('Test parseComments.js - alias', function () {
  const content = `
  /**
   * Function description
   * @alias IceCream
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].name).toStrictEqual('IceCream()');
});

test('Test parseComments.js - Alias', function () {
  const content = `
  /**
   * Function description
   * @Alias IceCream
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].name).toStrictEqual('IceCream()');
});

test('Test parseComments.js - package name', function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */
  `;
  const comments = parseComments(
    [{ path: './index.js', content: content }],
    'MyPackage'
  );
  expect(comments[0].name).toStrictEqual('MyPackage()');
});

test('Test parseComments.js - 1 implied name max.', function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */

   /**
    * Another function description
    * @public
    * @param {number} num - a number
    * @returns {number} - number of numbers
    */
  `;
  expect(() => parseComments([{ path: './index.js', content: content }]))
    .toThrow(`
There can only be 1 implied name per file.
Already implied:
File: ./index.js
Line: 1`);
});

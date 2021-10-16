const parseComments = require('./parseComments.js');
const path = require('path');

test('Test parseComments.js - description', async function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   */
  `;
  const comments = await parseComments([
    {
      content: content,
      path: './every/path/starts/with/a/single/step',
    },
  ]);
  expect(comments[0].description).toStrictEqual('Function description');
});

test('Test parseComments.js - description by typedef', async function () {
  const content = `
  /**
   * @typedef Book - a book type
   * @public
   * @param {number} pages - number of pages
   */
  `;
  const comments = await parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].description).toStrictEqual('A book type');
});

test('Test parseComments.js - source', async function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   */
  `;
  const comments = await parseComments([
    {
      content: content,
      path: './every/path/starts/with/a/single/step',
    },
  ]);
  expect(comments[0].source).toStrictEqual({
    path: './every/path/starts/with/a/single/step',
    url: 'every/path/starts/with/a/single/step',
    line: 2,
  });
});

test('Test parseComments.js - properties', async function () {
  const content = `
  /**
   * @typedef {Object} Source
   * @public
   * @property {number} lnnumber - source line number
   */
  `;
  const comments = await parseComments([
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

test('Test parseComments.js - returns', async function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */
  `;
  const comments = await parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].returns).toStrictEqual({
    type: 'number',
    description: 'Number of numbers',
  });
});

test('Test parseComments.js - alias', async function () {
  const content = `
  /**
   * Function description
   * @alias IceCream
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */
  `;
  const comments = await parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].name).toStrictEqual('.IceCream()');
});

test('Test parseComments.js - Alias', async function () {
  const content = `
  /**
   * Function description
   * @Alias IceCream
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */
  `;
  const comments = await parseComments([
    {
      content: content,
      path: './every/path/starts/with/a/single/step',
    },
  ]);
  expect(comments[0].name).toStrictEqual('.IceCream()');
});

test('Test parseComments.js - package name', async function () {
  const content = `
  /**
   * Function description
   * @public
   * @param {number} num - a number
   * @returns {number} - number of numbers
   */
  `;
  const comments = await parseComments(
    [{ path: './index.js', content: content }],
    'MyPackage'
  );
  expect(comments[0].name).toStrictEqual('MyPackage()');
});

test('Test parseComments.js - 1 implied name max.', async function () {
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
  let errMessage;
  await parseComments([{ path: './index.js', content: content }]).catch(
    function (err) {
      errMessage = err.message;
    }
  );
  expect(errMessage).toStrictEqual(`
There can only be 1 implied name per file.
Already implied:
File: ./index.js
Line: 1`);
});

const parseComments = require('./parseComments.js');

test('Test parseComments.js - description', async function () {
  const content = `
  /**
   * Function description
   * @private
   * @param {number} num - a number
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].comments[0].description).toStrictEqual(
    'Function description'
  );
});

test('Test parseComments.js - source', async function () {
  const content = `
  /**
   * Function description
   * @private
   * @param {number} num - a number
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].comments[0].source).toStrictEqual({
    path: './every/path/starts/with/a/single/step',
    line: 2,
  });
});

test('Test parseComments.js - tags', async function () {
  const content = `
  /**
   * @typedef {Object} Source
   * @private
   * @property {number} lnnumber - source line number
   */
  `;
  const comments = parseComments([
    { path: './every/path/starts/with/a/single/step', content: content },
  ]);
  expect(comments[0].comments[0].tags).toStrictEqual([
    {
      description: '',
      name: 'Source',
      optional: false,
      tag: 'typedef',
      type: 'Object',
    },
    {
      description: '',
      name: '',
      optional: false,
      tag: 'private',
      type: '',
    },
    {
      description: 'source line number',
      name: 'lnnumber',
      optional: false,
      tag: 'property',
      type: 'number',
    },
  ]);
});

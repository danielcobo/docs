const parseTemplate = require('./parseTemplate.js');
const fs = require('@danielcobo/fs');
const Handlebars = require('handlebars');

beforeAll(async function () {
  await fs.clone('./LICENSE.hbs', 'original_LICENSE.hbs');
  await fs.rm('./LICENSE.hbs');
});
afterAll(async function () {
  await fs.clone('original_LICENSE.hbs', './LICENSE.hbs');
  await fs.rm('./original_LICENSE.hbs');
});

test('Test parseTemplate.js - basic', async function () {
  await fs.mk('./LICENSE.hbs', '{{repo.name}}');
  const data = {
    definition: [{ name: 'Definition 1' }],
    repo: { name: 'testpackage' },
  };
  const parsed = await parseTemplate(data, 'LICENSE.hbs');
  const expectedParsed = 'testpackage';
  expect(parsed).toStrictEqual(expectedParsed);
});

test('Test parseTemplate.js - noscope Handlebars helper', async function () {
  await fs.mk('./LICENSE.hbs', '{{noscope repo.name}}');
  const data = {
    definition: [{ name: 'Definition 1' }],
    repo: { name: '@danielcobo/testpackage' },
  };
  const parsed = await parseTemplate(data, 'LICENSE.hbs');
  const expectedParsed = 'testpackage';
  expect(parsed).toStrictEqual(expectedParsed);
});

test('Test parseTemplate.js - nogit Handlebars helper', async function () {
  await fs.mk('./LICENSE.hbs', '{{nogit repo.url}}');
  const data = {
    definition: [{ name: 'Definition 1' }],
    repo: { url: 'git+https://github.com/danielcobo/docs.git' },
  };
  const parsed = await parseTemplate(data, 'LICENSE.hbs');
  const expectedParsed = 'https://github.com/danielcobo/docs';
  expect(parsed).toStrictEqual(expectedParsed);
});

test('Test parseTemplate.js - typecode Handlebars helper', async function () {
  await fs.mk(
    './LICENSE.hbs',
    '{{#each definition}}{{{typecode type}}}{{/each}}'
  );
  const data = {
    definition: [{ type: 'string|array' }],
    repo: { name: '@danielcobo/testpackage' },
  };
  const parsed = await parseTemplate(data, 'LICENSE.hbs');
  const expectedParsed = '`string`|`array`';
  expect(parsed).toStrictEqual(expectedParsed);
});

test('Test parseTemplate.js - major Handlebars helper', async function () {
  await fs.mk('./LICENSE.hbs', '{{major repo.version}}');
  const data = {
    definition: [{ name: 'Definition 1' }],
    repo: { version: '^1.x.4' },
  };
  const parsed = await parseTemplate(data, 'LICENSE.hbs');
  const expectedParsed = '1';
  expect(parsed).toStrictEqual(expectedParsed);
});

test('Test parseTemplate.js - minor Handlebars helper', async function () {
  await fs.mk('./LICENSE.hbs', '{{minor repo.version}}');
  const data = {
    definition: [{ name: 'Definition 1' }],
    repo: { version: '~1.7.x' },
  };
  const parsed = await parseTemplate(data, 'LICENSE.hbs');
  const expectedParsed = '1.7';
  expect(parsed).toStrictEqual(expectedParsed);
});

test('Test parseTemplate.js - boilerplate', async function () {
  await fs.rm('./LICENSE.hbs');
  const data = {
    definition: [{ type: 'string|array' }],
    repo: { name: '@danielcobo/testpackage' },
  };
  const parsed = await parseTemplate(data, 'LICENSE.hbs');
  const template = await fs.read('./boilerplate/LICENSE.hbs');
  const parser = Handlebars.compile(template);
  expect(parsed).toStrictEqual(parser(data));
});

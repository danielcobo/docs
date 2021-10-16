const docs = require('./index.js');
const parseComments = require('./parseComments.js');
const fs = require('@danielcobo/fs');

beforeAll(async function () {
  await fs.clone('./README.hbs', './original_README.hbs');
  await fs.clone('./README.md', './original_README.md');

  await fs.mk('./README.hbs', '{{repo.name}}');
});
afterAll(async function () {
  await fs.clone('./original_README.hbs', './README.hbs');
  await fs.rm('./original_README.hbs');

  await fs.clone('./original_README.md', './README.md');
  await fs.rm('./original_README.md');
});
test('Test index.js', async function () {
  await docs();
  const readme = await fs.read('./README.md');

  expect(readme).toStrictEqual('@danielcobo/docs');
});

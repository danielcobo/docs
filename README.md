# docs

Automate repo documentation

## 🧭 Table of contents

- [✨ Benefits](#-benefits)
- [🎒 Requierments](#-requierments)
- [🚀 Quickstart](#-quickstart)
- [📘 Documentation](#-documentation)
- [🆘 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [🧪 Testing](#-testing)
- [⚖️ License](#️-license)

## ✨ Benefits

- [x] Boilerplates for LICENSE and README
- [x] Customisable
- [x] Simple handlebars template
- [x] Much less overhead than JSDoc
- [x] Leverages data from package.json

## 🎒 Requierments

To use this package you will need:

- [NodeJS](https://nodejs.org/en/)

## 🚀 Quickstart

### Install

```cli
npm install @danielcobo/docs -D
```

<sub>**Note:** In case you're wondering, **@danielcobo/** is just a [namespace scope](https://docs.npmjs.com/about-scopes/) - an NPM feature. Scopes make it easier to name modules and improve [security](https://github.blog/2021-02-12-avoiding-npm-substitution-attacks/).</sub>

For details see documentation below.

## 📘 Documentation

  ### Definition : `Object`
  
    | Name | Type | Description |
    | ---- | ---- | ----------- |
    | description | `string` | Type/function description text |
    | name | `string` | Type/function name |
    | type | `string` | Type (i.e. function, method, object...) |
    | isTypedef | `boolean` | True if typedef (else assume function) |
    | param | [`Array.Param`](#param--object) | Function parameters |
    | property | [`Array.Property`](#property--object) | Type/function properties |
    | returns | [`ReturnValue`](#returnvalue--object) | Function return value |
    | source | [`Source`](#source--object) | Type/function definition source |
  <sub>Source:[src/parseComments.js:164](https://github.com/danielcobo/docs/src/parseComments.js?plain=1#L164)</sub>

  ### ReturnValue : `Object`
  
    | Name | Type | Description |
    | ---- | ---- | ----------- |
    | type | `string` | Data type of return value |
    | description | `string` | Description of return value |
  <sub>Source:[src/parseComments.js:142](https://github.com/danielcobo/docs/src/parseComments.js?plain=1#L142)</sub>

  ### Source : `Object`
  
    | Name | Type | Description |
    | ---- | ---- | ----------- |
    | line | `number` | Source line number |
    | path | `string` | Source file path |
    | url | `string` | Relative source file url |
  <sub>Source:[src/parseComments.js:134](https://github.com/danielcobo/docs/src/parseComments.js?plain=1#L134)</sub>

  ### Property : `Object`
  Type definition property
    | Name | Type | Description |
    | ---- | ---- | ----------- |
    | name | `string` | Property name |
    | type | `string` | Property value data type |
    | description | `string` | Property description |
    | optional | `boolean` | True/false if property is optional |
  <sub>Source:[src/parseComments.js:113](https://github.com/danielcobo/docs/src/parseComments.js?plain=1#L113)</sub>

  ### Param : `Object`
  Function parameter
    | Name | Type | Description |
    | ---- | ---- | ----------- |
    | name | `string` | Parameter name |
    | type | `string` | Argument data type |
    | description | `string` | Parameter description |
    | optional | `boolean` | True/false if parameter is optional |
    | default | `*` | Default argument value |
  <sub>Source:[src/parseComments.js:94](https://github.com/danielcobo/docs/src/parseComments.js?plain=1#L94)</sub>

  ### Data : `Object`
  
    | Name | Type | Description |
    | ---- | ---- | ----------- |
    | definition | [`Array.Definition`](#definition--object) | Definition object |
    | repo | `Package` | Object of package.json data |
  <sub>Source:[src/index.js:19](https://github.com/danielcobo/docs/src/index.js?plain=1#L19)</sub>

## 🆘 Troubleshooting

Insert caveats

## 🤝 Contributing

### Anyone can contribute

Contributions come in many shapes and sizes. All are welcome.
You can contribute by:

- asking questions
- suggesting features
- sharing this repo with friends
- improving documentation (even fixing typos counts 😉)
- providing tutorials (if you do, please [let me know](https://twitter.com/danielcobocom), I would love to read them)
- improving tests
- contributing code (new features, performance boosts, code readability improvements..)

### Rules for contributions

**General guidelines:**

- there are no dumb questions
- be polite and respectful to others
- do good

**When coding remember:**

- working > maintainability > performance
- best code is no code
- be descriptive when naming
- keep it [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- do test

**Contribution licence:**
All contributions are considered to be under same [license](#license) as this repository.

## 🧪 Testing

**Testing suite:** [🃏 Jest](https://jestjs.io) | **Test command:** `npm test`

**Mutation testing suite:** [👽 Stryker Mutator](https://stryker-mutator.io) | **Mutation test command:** `npm run mutation`

If you intend to develop further or contribute code, then please ensure to write and use testing. Strive for 100% code coverage and high mutation scores. Mutation score 100 is great, but it's not always neccessary (if there are valid reasons).

## ⚖️ License

[MIT License](https://github.com/danielcobo/docs/blob/master/LICENSE.md)
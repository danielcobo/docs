const chalk = require('chalk');
const process = require('process');

/**
 * Log error and exit
 * @param {*} err
 * @param {*} description
 */
const handleError = function handleError(description, err) {
  console.log(chalk.red(`${description}\n${err.stack}`));
  process.exit(1);
};

/**
 * Set error message
 * @param {string} description
 */
module.exports = function errMessage(description) {
  return function (err) {
    handleError(description, err);
  };
};

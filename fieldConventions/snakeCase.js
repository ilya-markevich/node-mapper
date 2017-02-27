'use strict';

const { snakeCase } = require('lodash');
const { SNAKE_CASE_CONVENTION } = require('./constants');

class SnakeConvention {
  constructor() {
    this.name = SNAKE_CASE_CONVENTION;
  }

  getField(fieldName) {
    return snakeCase(fieldName);
  }
}

module.exports = SnakeConvention;
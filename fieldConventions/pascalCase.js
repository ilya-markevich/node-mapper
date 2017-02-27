'use strict';

const { camelCase, upperFirst } = require('lodash');
const { PASCAL_CASE_CONVENTION } = require('./constants');

class PascalConvention {
  constructor() {
    this.name = PASCAL_CASE_CONVENTION;
  }

  getField(fieldName) {
    return upperFirst(camelCase(fieldName));
  }
}

module.exports = PascalConvention;
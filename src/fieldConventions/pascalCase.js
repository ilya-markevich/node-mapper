'use strict';

const upperFirst = require('upper-case-first');
const camelCase = require('camelcase');
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
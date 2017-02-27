'use strict';

const { camelCase } = require('lodash');
const { CAMEL_CASE_CONVENTION } = require('./constants');

class CamelConvention {
  constructor() {
    this.name = CAMEL_CASE_CONVENTION;
  }

  getField(fieldName) {
    return camelCase(fieldName);
  }
}

module.exports = CamelConvention;
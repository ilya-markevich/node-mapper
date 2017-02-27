'use strict';

require('should');

const { CAMEL_CASE_CONVENTION } = require('../../fieldConventions/constants');
const CamelCaseConvention = require('../../fieldConventions/camelCase');

const generateTests = require('./testsGenerator');
const { testFields } = require('../data/conventions/camelCase');

describe('Camel Case convention', () => {
  generateTests({
    Convention: CamelCaseConvention,
    name: CAMEL_CASE_CONVENTION,
    fieldsData: testFields
  });
});
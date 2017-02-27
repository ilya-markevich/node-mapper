'use strict';

require('should');

const { CAMEL_CASE_CONVENTION } = require('../../../src/fieldConventions/constants');
const CamelCaseConvention = require('../../../src/fieldConventions/camelCase');

const generateTests = require('./testsGenerator');
const { testFields } = require('../data/conventions/camelCase');

describe('Camel Case convention', () => {
  generateTests({
    Convention: CamelCaseConvention,
    name: CAMEL_CASE_CONVENTION,
    fieldsData: testFields
  });
});
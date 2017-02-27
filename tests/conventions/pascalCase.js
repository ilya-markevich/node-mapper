'use strict';

require('should');

const { PASCAL_CASE_CONVENTION } = require('../../src/fieldConventions/constants');
const PascalCaseConvention = require('../../src/fieldConventions/pascalCase');

const generateTests = require('./testsGenerator');
const { testFields } = require('../data/conventions/pascalCase');

describe('Pascal Case convention', () => {
  generateTests({
    Convention: PascalCaseConvention,
    name: PASCAL_CASE_CONVENTION,
    fieldsData: testFields
  });
});
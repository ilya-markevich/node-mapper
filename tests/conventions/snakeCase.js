'use strict';

require('should');

const { SNAKE_CASE_CONVENTION } = require('../../src/fieldConventions/constants');
const SnakeCaseConvention = require('../../src/fieldConventions/snakeCase');

const generateTests = require('./testsGenerator');
const { testFields } = require('../data/conventions/snakeCase');

describe('Snake Case convention', () => {
  generateTests({
    Convention: SnakeCaseConvention,
    name: SNAKE_CASE_CONVENTION,
    fieldsData: testFields
  });
});
'use strict';

require('should');

const { SNAKE_CASE_CONVENTION } = require('../../fieldConventions/constants');
const SnakeCaseConvention = require('../../fieldConventions/snakeCase');

const generateTests = require('./testsGenerator');
const { testFields } = require('../data/conventions/snakeCase');

describe('Snake Case convention', () => {
  generateTests({
    Convention: SnakeCaseConvention,
    name: SNAKE_CASE_CONVENTION,
    fieldsData: testFields
  });
});
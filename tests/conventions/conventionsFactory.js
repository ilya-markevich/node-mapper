'use strict';

require('should');

const testData = require('../data/conventions/conventionsFactory');
const { CAMEL_CASE_CONVENTION, PASCAL_CASE_CONVENTION, SNAKE_CASE_CONVENTION } = require('../../fieldConventions/constants');

describe('Convention Factory', () => {
  let factory;

  beforeEach(() => {
    delete require.cache[require.resolve('../../fieldConventions/conventionsFactory')];
    factory = require('../../fieldConventions/conventionsFactory');
  });

  describe('Initial State', () => {
    it('should check initial registered conventions', () => {
      factory.has(CAMEL_CASE_CONVENTION).should.be.eql(true);
      factory.has(PASCAL_CASE_CONVENTION).should.be.eql(true);
      factory.has(SNAKE_CASE_CONVENTION).should.be.eql(true);
    });
  });

  describe('#register', () => {
    it('should register new convention', () => {
      const { newConventionName, NewConvention } = testData;

      factory.register(newConventionName, NewConvention);
      factory.get(newConventionName).should.have.property('name', newConventionName);
    });
  });

  describe('#get', () => {
    it('should get convention', () => {
      factory.get(CAMEL_CASE_CONVENTION).should.have.property('name', CAMEL_CASE_CONVENTION);
    });
  });

  describe('#has', () => {
    it('should return that factory has convention', () => {
      factory.has(CAMEL_CASE_CONVENTION).should.be.eql(true);
    });

    it('should return that factory hasn\'t convention', () => {
      const { fakeConventionName } = testData;

      factory.has(fakeConventionName).should.be.eql(false);
    });
  });
});
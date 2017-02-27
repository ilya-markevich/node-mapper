'use strict';

require('should');

const { upperFirst } = require('lodash');
const sinon = require('sinon');

const { CAMEL_CASE_CONVENTION, PASCAL_CASE_CONVENTION, SNAKE_CASE_CONVENTION } = require('../src/fieldConventions/constants');
const Mapper = require('../src/mapper');

const testData = require('./data/mapper');

describe('Mapper', () => {
  describe('constants', () => {
    it('should check static constants', () => {
      const mapper = new Mapper();

      mapper.CAMEL_CASE_CONVENTION.should.be.eql(CAMEL_CASE_CONVENTION);
      mapper.PASCAL_CONVENTION.should.be.eql(PASCAL_CASE_CONVENTION);
      mapper.SNAKE_CONVENTION.should.be.eql(SNAKE_CASE_CONVENTION);
    });
  });

  describe('#registerConvention', () => {
    it('should register new convention', () => {
      const { newConventionName, NewConvention } = testData;
      const mapper = new Mapper();

      mapper.conventionsFactory.register = sinon.mock().withArgs(newConventionName, NewConvention);

      mapper.registerConvention(newConventionName, NewConvention);
      mapper.conventionsFactory.register.verify();
    });
  });

  describe('#geneateType', () => {
    it('should generate new type', () => {
      const { newTypeName, newTypeFields } = testData;
      const mapper = new Mapper();

      const CustomType = mapper.generateType(newTypeName, newTypeFields);

      CustomType.should.have.property('name', upperFirst(newTypeName));
      (new CustomType()).should.have.properties(newTypeFields);
    });
  });

  describe('#register', () => {
    it('should not register new map because convention is incorrect', () => {
      const { incorrectConvention } = testData;
      const mapper = new Mapper();

      mapper.conventionsFactory.has = sinon.stub().returns(false);
      mapper.register.bind(mapper, incorrectConvention).should.throw('Unsupported convention.');
    });

    it('should not register new map because Source Type is incorrect', () => {
      const { mapMethodName, incorrectSourceType } = testData;
      const mapper = new Mapper();

      mapper.conventionsFactory.has = sinon.stub().returns(true);
      mapper.register.bind(mapper, Mapper.CAMEL_CASE_CONVENTION, mapMethodName, incorrectSourceType).should.throw(
        'Unsupported source type. Source type should be constructor function (Object or custom)'
      );
    });

    it('should not register new map because Destination Type is incorrect', () => {
      const { mapMethodName, incorrectDestType } = testData;
      const mapper = new Mapper();

      mapper.conventionsFactory.has = sinon.stub().returns(true);
      mapper.register.bind(mapper, Mapper.CAMEL_CASE_CONVENTION, mapMethodName, Object, incorrectDestType).should.throw(
        'Unsupported destination type. Destination type should be constructor function (Object or custom)'
      );
    });

    it('should register new map', () => {
      const { mapMethodName, mapInstance, mapSourceType, mapDestType } = testData;
      const mapper = new Mapper();
      const convention = mapper.CAMEL_CASE_CONVENTION;

      mapper.conventionsFactory.has = sinon.stub().returns(true);
      mapper.conventionsFactory.get = sinon.stub().returns(convention);

      mapper.MapInstance = sinon.mock().withArgs(convention, mapSourceType, mapDestType).returns(mapInstance);

      const resultMapInstance = mapper.register(convention, mapMethodName, mapSourceType, mapDestType);

      resultMapInstance.should.be.eql(mapInstance);
    });
  });
});
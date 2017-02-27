'use strict';

require('should');

const TypeWrapper = require('../src/typeWrapper');
const testData = require('./data/typeWrapper');

describe('Type Wrapper', () => {
  describe('Initial State', () => {
    it('should correctly set initial state for simple constructor', () => {
      const typeWrapper = new TypeWrapper(Object);

      typeWrapper.should.have.property('type', Object);
      (typeWrapper.typeInstance.constructor === Object).should.be.eql(true);
      typeWrapper.isSimpleObject.should.be.eql(true);
    });

    it('should correctly set initial state for custom constructor', () => {
      const { CustomConstructor } = testData;

      const typeWrapper = new TypeWrapper(CustomConstructor);

      typeWrapper.should.have.property('type', CustomConstructor);
      (typeWrapper.typeInstance.constructor === CustomConstructor).should.be.eql(true);
      typeWrapper.isSimpleObject.should.be.eql(false);
    });
  });

  describe('#getFields', () => {
    it('should correctly get fields for simple object', () => {
      const { simpleObject, simpleObjectFields } = testData;
      const typeWrapper = new TypeWrapper(Object);

      typeWrapper.getFields(simpleObject).should.be.eql(simpleObjectFields);
    });

    it('should correctly get fields for simple object without passed object', () => {
      const typeWrapper = new TypeWrapper(Object);

      typeWrapper.getFields().should.be.eql([]);
    });

    it('should correctly get fields for custom object', () => {
      const { CustomObjectConstructor, customObjectFields } = testData;
      const typeWrapper = new TypeWrapper(CustomObjectConstructor);

      typeWrapper.getFields().should.be.eql(customObjectFields);
    });
  });

  describe('#getInstance', () => {
    it('should get simple object instance', () => {
      const typeWrapper = new TypeWrapper(Object);

      Object.keys(typeWrapper.getInstance()).should.have.length(0);
    });

    it('should get simple object instance', () => {
      const { CustomObjectConstructor, customObjectFields } = testData;
      const typeWrapper = new TypeWrapper(CustomObjectConstructor);

      const instance = typeWrapper.getInstance();

      instance.should.have.properties(customObjectFields);
      Object.keys(typeWrapper.getInstance()).should.have.length(customObjectFields.length);
    });
  });

  describe('#hasProperty', () => {
    it('should return true for simple object', () => {
      const { fieldInObject } = testData;
      const typeWrapper = new TypeWrapper(Object);

      typeWrapper.hasProperty(fieldInObject).should.be.eql(true);
    });

    it('should return true for custom object', () => {
      const { CustomObjectConstructor, fieldInObject } = testData;
      const typeWrapper = new TypeWrapper(CustomObjectConstructor);

      typeWrapper.hasProperty(fieldInObject).should.be.eql(true);
    });

    it('should return false for custom object', () => {
      const { CustomObjectConstructor, fieldNotInObject } = testData;
      const typeWrapper = new TypeWrapper(CustomObjectConstructor);

      typeWrapper.hasProperty(fieldNotInObject).should.be.eql(false);
    });
  });
});
'use strict';

const newConventionName = 'test';

class NewConvention {
  getField() {
    return 'test';
  }
}

const newTypeName = 'customType';
const newTypeFields = ['field1', 'field2', 'field3', 'field4'];

const incorrectConvention = 'test';
const incorrectSourceType = Number;
const incorrectDestType = Array;

const mapMethodName = 'makeTest';
const mapInstance = {
  map() {
    return 'test';
  }
};
const mapSourceType = Object;
const mapDestType = Object;

module.exports = {
  newConventionName,
  NewConvention,
  newTypeName,
  newTypeFields,
  incorrectConvention,
  incorrectSourceType,
  incorrectDestType,
  mapMethodName,
  mapInstance,
  mapSourceType,
  mapDestType
};
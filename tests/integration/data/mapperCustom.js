'use strict';

const methodName = 'testMap';

const SourceSimpleType = Object;
const DestSimpleType = Object;

class SourceCustomType {
  constructor() {
    this.field1 = undefined;
    this.field2 = undefined;
  }
}
class DestCustomType {
  constructor() {
    this.field_2 = undefined;
    this.field_3 = undefined;
  }
}

const sourceSimpleObject = {
  field1: 'test1',
  field2: 'test2',
  field3: 'test3'
};
const sourceCustomObject = {
  field2: 'test1',
  field3: 'test2'
};

const expectedDestSimpleToSimpleObject = {
  field_1: 'test1',
  field_2: 'TEST2'
};
const expectedDestSimpleToCustomObject = {
  field_2: 't',
  field_3: 'test3'
};
const expectedDestCustomToSimpleObject = {
  field_1: undefined,
  field_2: 'test1',
  test: undefined
};
const expectedDestCustomToCustomObject = {
  field_2: 'TEST1',
  field_3: undefined
};

module.exports = {
  methodName,
  SourceSimpleType,
  DestSimpleType,
  SourceCustomType,
  DestCustomType,
  sourceSimpleObject,
  sourceCustomObject,
  expectedDestSimpleToSimpleObject,
  expectedDestSimpleToCustomObject,
  expectedDestCustomToSimpleObject,
  expectedDestCustomToCustomObject
};
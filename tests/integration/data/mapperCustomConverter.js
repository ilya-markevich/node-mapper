'use strict';

const methodName = 'testMap';

const SourceSimpleType = Object;
const DestSimpleType = Object;

const sourceSimpleObject = {
  field1: 'test1',
  field2: 'test2',
  field3: 'test3'
};
const expectedDestSimpleToSimpleObject = {
  result_1: 'test1',
  result_2: 'test2'
};

module.exports = {
  methodName,
  SourceSimpleType,
  DestSimpleType,
  sourceSimpleObject,
  expectedDestSimpleToSimpleObject
};
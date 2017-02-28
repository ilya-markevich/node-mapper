'use strict';

require('should');

const Mapper = require('../../src/mapper');
const testData = require('./data/mapperCustomConverter');

describe('Mapper with custom converter', () => {
  it('should use new map with custom converter', () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, expectedDestSimpleToSimpleObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceSimpleType, DestSimpleType, (map) => {
      map.convert((value) => {
        return {
          result_1: value.field1,
          result_2: value.field2
        };
      });
    });

    mapper[methodName](sourceSimpleObject).should.be.eql(expectedDestSimpleToSimpleObject);
  });

  it('should use new map with custom converter and null value', () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceSimpleType, DestSimpleType, (map) => {
      map.convert(() => {
        return null;
      });
    });

    (mapper[methodName](sourceSimpleObject) === null).should.be.eql(true);
  });
});
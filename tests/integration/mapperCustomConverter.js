'use strict';

require('should');

const Mapper = require('../../src/mapper');
const testData = require('./data/mapperCustomConverter');

const { checkResult, checkNullResult } = require('../helpers/integration/resultChecker');

function generateMapperCustomConverterTests(isAsync) {
  const { methodName } = testData;
  const fullMethodName = isAsync ? `${methodName}Async` : methodName;
  const testsPrefix = isAsync ? '- async' : '';

  it(`should use new map with custom converter ${testsPrefix}`, () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, expectedDestSimpleToSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestSimpleType, (map) => {
      map.convert((value) => {
        return {
          result_1: value.field1,
          result_2: value.field2
        };
      });
    });

    return checkResult(testData, mapper[fullMethodName](sourceSimpleObject), expectedDestSimpleToSimpleObject, false, isAsync);
  });

  it(`should use new map with custom converter and null value ${testsPrefix}`, () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestSimpleType, (map) => {
      map.convert(() => {
        return null;
      });
    });

    return checkNullResult(mapper[fullMethodName](sourceSimpleObject), isAsync);
  });
}

describe('Mapper with custom converter', () => {
  generateMapperCustomConverterTests(false);

  generateMapperCustomConverterTests(true);
});
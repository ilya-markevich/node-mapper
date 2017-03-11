'use strict';

require('should');

const Mapper = require('../../src/mapper');
const testData = require('./data/mapperCustom');

const { checkResult } = require('../helpers/integration/resultChecker');

function resultToPromise(result, isPromisify) {
  if (isPromisify) {
    return Promise.resolve(result);
  } else {
    return result;
  }
}

function generateMapperCustomTests(isAsync) {
  const { methodName } = testData;
  const fullMethodName = isAsync ? `${methodName}Async` : methodName;
  const testsPrefix = isAsync ? '- async' : '';

  it(`should use array new map with custom behaviour (Simple Type to Simple Type) ${testsPrefix}`, () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, expectedDestSimpleToSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestSimpleType, (map) => {
      map.ignoreField('field_3')
        .mapField('field_2', obj => resultToPromise(obj.field2.toUpperCase(), isAsync))
        .mapFieldByPath('field_1', 'field1');
    });

    return checkResult(testData, mapper[fullMethodName]([sourceSimpleObject]), [expectedDestSimpleToSimpleObject], false, isAsync);
  });

  it(`should use new map with custom behaviour (Simple Type to Simple Type) ${testsPrefix}`, () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, expectedDestSimpleToSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestSimpleType, (map) => {
      map.ignoreField('field_3')
        .mapField('field_2', obj => resultToPromise(obj.field2.toUpperCase(), isAsync))
        .mapFieldByPath('field_1', 'field1');
    });

    return checkResult(testData, mapper[fullMethodName](sourceSimpleObject), expectedDestSimpleToSimpleObject, false, isAsync);
  });

  it(`should use new map with default behaviour (Simple Type to Custom Type) ${testsPrefix}`, () => {
    const { SourceSimpleType, DestCustomType, sourceSimpleObject, expectedDestSimpleToCustomObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestCustomType, (map) => {
      map.mapField('field_2', obj => resultToPromise(obj.field2.substring(0, 1), isAsync))
        .mapField('field_test', 'fieldTest')
        .mapFieldByPath('field_test2', 'fieldTest2');
    });

    return checkResult(testData, mapper[fullMethodName](sourceSimpleObject), expectedDestSimpleToCustomObject, true, isAsync);
  });

  it(`should use new map with default behaviour (Custom Type to Simple Type) ${testsPrefix}`, () => {
    const { SourceCustomType, DestSimpleType, sourceCustomObject, expectedDestCustomToSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceCustomType, DestSimpleType, (map) => {
      map.mapField('test', 'test');
    });

    return checkResult(testData, mapper[fullMethodName](sourceCustomObject), expectedDestCustomToSimpleObject, false, isAsync);
  });

  it(`should use new map with default behaviour (Custom Type to Custom Type) ${testsPrefix}`, () => {
    const { SourceCustomType, DestCustomType, sourceCustomObject, expectedDestCustomToCustomObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceCustomType, DestCustomType, (map) => {
      map.mapField('field_2', obj => resultToPromise(obj.field2.toUpperCase(), isAsync));
    });

    return checkResult(testData, mapper[fullMethodName](sourceCustomObject), expectedDestCustomToCustomObject, true, isAsync);
  });
}

describe('Mapper with custom map', () => {
  generateMapperCustomTests(false);

  generateMapperCustomTests(true);
});
'use strict';

require('should');

const Mapper = require('../../src/mapper');
const testData = require('./data/mapperDefault');

const { checkResult, checkNullResult } = require('../helpers/integration/resultChecker');

function generateMapperDefaultTests(isAsync) {
  const { methodName } = testData;
  const fullMethodName = isAsync ? `${methodName}Async` : methodName;
  const testsPrefix = isAsync ? '- async' : '';

  it(`should correctly map null to null ${testsPrefix}`, () => {
    const { SourceSimpleType, DestSimpleType } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestSimpleType);
    return checkNullResult(mapper[fullMethodName](null), isAsync);
  });

  it(`should use new map with default behaviour (Simple Type to Simple Type) ${testsPrefix}`, () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, expectedDestSimpleToSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestSimpleType);
    return checkResult(testData, mapper[fullMethodName](sourceSimpleObject), expectedDestSimpleToSimpleObject, false, isAsync);
  });

  it(`should use new map with default behaviour (Simple Type to Custom Type) ${testsPrefix}`, () => {
    const { SourceSimpleType, DestCustomType, sourceSimpleObject, expectedDestSimpleToCustomObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestCustomType);
    return checkResult(testData, mapper[fullMethodName](sourceSimpleObject), expectedDestSimpleToCustomObject, true, isAsync);
  });

  it(`should use new map with default behaviour (Custom Type to Simple Type) ${testsPrefix}`, () => {
    const { SourceCustomType, DestSimpleType, sourceCustomObject, expectedDestCustomToSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceCustomType, DestSimpleType);
    return checkResult(testData, mapper[fullMethodName](sourceCustomObject), expectedDestCustomToSimpleObject, false, isAsync);
  });

  it(`should use new map with default behaviour (Custom Type to Custom Type) ${testsPrefix}`, () => {
    const { SourceCustomType, DestCustomType, sourceCustomObject, expectedDestCustomToCustomObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceCustomType, DestCustomType);
    return checkResult(testData, mapper[fullMethodName](sourceCustomObject), expectedDestCustomToCustomObject, true, isAsync);
  });
}

describe('Mapper with default behaviour', () => {
  generateMapperDefaultTests(false);

  generateMapperDefaultTests(true);
});
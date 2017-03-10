'use strict';

require('should');

const Mapper = require('../../src/mapper');
const testData = require('./data/mapperDefault');

function checkResult(result, expectedResult, isTypeCheck, isAsync) {
  function checkType(result, isTypeCheck) {
    if (isTypeCheck) {
      const { DestCustomType } = testData;

      (result instanceof DestCustomType).should.be.eql(true);
    }
  }

  if (isAsync) {
    return result.then((actualResult) => {
      actualResult.should.have.properties(expectedResult);
      checkType(actualResult, isTypeCheck);
    });
  } else {
    result.should.have.properties(expectedResult);
    checkType(result, isTypeCheck);
  }
}

function generateMapperDefaultTests(isAsync) {
  const { methodName } = testData;
  const fullMethodName = isAsync ? `${methodName}Async` : methodName;
  const testsPrefix = isAsync ? '- async' : '';

  it(`should correctly map null to null ${testsPrefix}`, () => {
    const { SourceSimpleType, DestSimpleType } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestSimpleType);

    if (isAsync) {
      return mapper[fullMethodName](null).then((actualResult) => {
        (actualResult === null).should.be.eql(true);
      });
    } else {
      (mapper[fullMethodName](null) === null).should.be.eql(true);
    }
  });

  it(`should use new map with default behaviour (Simple Type to Simple Type) ${testsPrefix}`, () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, expectedDestSimpleToSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestSimpleType);
    return checkResult(mapper[fullMethodName](sourceSimpleObject), expectedDestSimpleToSimpleObject, false, isAsync);
  });

  it(`should use new map with default behaviour (Simple Type to Custom Type) ${testsPrefix}`, () => {
    const { SourceSimpleType, DestCustomType, sourceSimpleObject, expectedDestSimpleToCustomObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceSimpleType, DestCustomType);
    return checkResult(mapper[fullMethodName](sourceSimpleObject), expectedDestSimpleToCustomObject, true, isAsync);
  });

  it(`should use new map with default behaviour (Custom Type to Simple Type) ${testsPrefix}`, () => {
    const { SourceCustomType, DestSimpleType, sourceCustomObject, expectedDestCustomToSimpleObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceCustomType, DestSimpleType);
    return checkResult(mapper[fullMethodName](sourceCustomObject), expectedDestCustomToSimpleObject, false, isAsync);
  });

  it(`should use new map with default behaviour (Custom Type to Custom Type) ${testsPrefix}`, () => {
    const { SourceCustomType, DestCustomType, sourceCustomObject, expectedDestCustomToCustomObject } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, fullMethodName, SourceCustomType, DestCustomType);
    return checkResult(mapper[fullMethodName](sourceCustomObject), expectedDestCustomToCustomObject, true, isAsync);
  });
}

describe('Mapper with default behaviour', () => {
  generateMapperDefaultTests(false);

  generateMapperDefaultTests(true);
});
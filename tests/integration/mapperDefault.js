'use strict';

require('should');

const Mapper = require('../../src/mapper');
const testData = require('./data/mapperDefault');

describe('Mapper with default behaviour', () => {
  it('should use new map with default behaviour (Simple Type to Simple Type)', () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, expectedDestSimpleToSimpleObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceSimpleType, DestSimpleType);
    mapper[methodName](sourceSimpleObject).should.be.eql(expectedDestSimpleToSimpleObject);
  });

  it('should use new map with default behaviour (Simple Type to Custom Type)', () => {
    const { SourceSimpleType, DestCustomType, sourceSimpleObject, expectedDestSimpleToCustomObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceSimpleType, DestCustomType);
    const mapResult = mapper[methodName](sourceSimpleObject);

    mapResult.should.have.properties(expectedDestSimpleToCustomObject);
    (mapResult instanceof DestCustomType).should.be.eql(true);
  });

  it('should use new map with default behaviour (Custom Type to Simple Type)', () => {
    const { SourceCustomType, DestSimpleType, sourceCustomObject, expectedDestCustomToSimpleObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceCustomType, DestSimpleType);
    mapper[methodName](sourceCustomObject).should.have.properties(expectedDestCustomToSimpleObject);
  });

  it('should use new map with default behaviour (Custom Type to Custom Type)', () => {
    const { SourceCustomType, DestCustomType, sourceCustomObject, expectedDestCustomToCustomObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceCustomType, DestCustomType);
    const mapResult = mapper[methodName](sourceCustomObject);

    mapResult.should.have.properties(expectedDestCustomToCustomObject);
    (mapResult instanceof DestCustomType).should.be.eql(true);
  });
});
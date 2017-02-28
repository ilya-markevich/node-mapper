'use strict';

require('should');

const Mapper = require('../../src/mapper');
const testData = require('./data/mapperCustom');

describe('Mapper with custom map', () => {
  it('should use new map with custom behaviour (Simple Type to Simple Type)', () => {
    const { SourceSimpleType, DestSimpleType, sourceSimpleObject, expectedDestSimpleToSimpleObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceSimpleType, DestSimpleType, (map) => {
      map.ignoreField('field_3')
        .mapField('field_2', obj => obj.field2.toUpperCase())
        .mapFieldByPath('field_1', 'field1');
    });

    mapper[methodName](sourceSimpleObject).should.be.eql(expectedDestSimpleToSimpleObject);
    mapper[methodName]([sourceSimpleObject]).should.be.eql([expectedDestSimpleToSimpleObject]);
  });

  it('should use new map with default behaviour (Simple Type to Custom Type)', () => {
    const { SourceSimpleType, DestCustomType, sourceSimpleObject, expectedDestSimpleToCustomObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceSimpleType, DestCustomType, (map) => {
      map.mapField('field_2', obj => obj.field2.substring(0, 1))
        .mapField('field_test', 'fieldTest');
    });
    const mapResult = mapper[methodName](sourceSimpleObject);

    mapResult.should.have.properties(expectedDestSimpleToCustomObject);
    (mapResult instanceof DestCustomType).should.be.eql(true);
  });

  it('should use new map with default behaviour (Custom Type to Simple Type)', () => {
    const { SourceCustomType, DestSimpleType, sourceCustomObject, expectedDestCustomToSimpleObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceCustomType, DestSimpleType, (map) => {
      map.mapField('test', 'test');
    });
    mapper[methodName](sourceCustomObject).should.have.properties(expectedDestCustomToSimpleObject);
  });

  it('should use new map with default behaviour (Custom Type to Custom Type)', () => {
    const { SourceCustomType, DestCustomType, sourceCustomObject, expectedDestCustomToCustomObject, methodName } = testData;
    const mapper = new Mapper();

    mapper.register(mapper.SNAKE_CASE_CONVENTION, methodName, SourceCustomType, DestCustomType, (map) => {
      map.mapField('field_2', obj => obj.field2.toUpperCase());
    });
    const mapResult = mapper[methodName](sourceCustomObject);

    mapResult.should.have.properties(expectedDestCustomToCustomObject);
    (mapResult instanceof DestCustomType).should.be.eql(true);
  });
});
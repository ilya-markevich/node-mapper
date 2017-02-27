'use strict';

require('should');

const sinon = require('sinon');

const TypeWrapper = require('../../src/typeWrapper');
const MapInstance = require('../../src/mapInstance');

const testData = require('./data/mapInstance');

function checkInitialState(mapInstance, convention) {
  (mapInstance.sourceType instanceof TypeWrapper).should.be.eql(true);
  (mapInstance.destType instanceof TypeWrapper).should.be.eql(true);
  mapInstance.mapInfo.should.have.property('size', 0);
  mapInstance.should.have.property('convention', convention);
  (mapInstance.convertCb === null).should.be.eql(true);
}

describe('Map Instance', () => {
  describe('Initial state', () => {
    it('should set correct initial state with passed callback', () => {
      const { sourceType, destType, convention } = testData;
      const configCb = sinon.mock().once();
      const mapInstance = new MapInstance(convention, sourceType, destType, configCb);

      checkInitialState(mapInstance, convention);
      configCb.verify();
    });

    it('should set correct initial state without passed callback', () => {
      const { sourceType, destType, convention } = testData;
      const mapInstance = new MapInstance(convention, sourceType, destType);

      checkInitialState(mapInstance, convention);
    });
  });

  describe('#mapField', () => {
    it('should set mapping for field', () => {
      const {
        convention, sourceType, destType, configCb, mapFieldName, mapFieldValue
      } = testData;
      const mapInstance = new MapInstance(convention, sourceType, destType, configCb);

      mapInstance.mapField(mapFieldName, mapFieldValue);
      mapInstance.mapInfo.get(mapFieldName).should.be.eql(mapFieldValue);
    });
  });

  describe('#ignoreField', () => {
    it('should set mapping to ignore the field', () => {
      const { convention, sourceType, destType, configCb, fieldToIgnore } = testData;
      const mapInstance = new MapInstance(convention, sourceType, destType, configCb);

      mapInstance.ignoreField(fieldToIgnore);
      (mapInstance.mapInfo.get(fieldToIgnore) === null).should.be.eql(true);
    });
  });

  describe('#mapFieldByPath', () => {
    it('should set field mapping by path', () => {
      const {
        convention, sourceType, destType, configCb, mapFieldName, fieldPath
      } = testData;
      const mapInstance = new MapInstance(convention, sourceType, destType, configCb);

      mapInstance.mapFieldByPath(mapFieldName, fieldPath);
      (typeof mapInstance.mapInfo.get(mapFieldName)).should.be.eql('function');
    });
  });

  describe('#convert', () => {
    it('should set convert function for map instance', () => {
      const { convention, sourceType, destType, configCb, convertCb } = testData;
      const mapInstance = new MapInstance(convention, sourceType, destType, configCb);

      mapInstance.convert(convertCb);
      mapInstance.convertCb.should.be.eql(convertCb);
    });
  });
});
'use strict';

/* eslint no-new-func: "off" */

const { upperFirst } = require('lodash');
const { CAMEL_CASE_CONVENTION, PASCAL_CASE_CONVENTION, SNAKE_CASE_CONVENTION } = require('./fieldConventions/constants');

const conventionsFactory = require('./fieldConventions/conventionsFactory');
const MapInstance = require('./mapInstance');

const checkMapperArgs = Symbol('_checkMapperArgs');

class Mapper {
  constructor() {
    this.conventionsFactory = conventionsFactory;
    this.MapInstance = MapInstance;
  }

  register(convention, methodName, SourceType, DestType, cb) {
    const self = this;

    self[checkMapperArgs](convention, SourceType, DestType);

    const mapInstance = new self.MapInstance(conventionsFactory.get(convention), SourceType, DestType, cb);

    this[methodName] = mapInstance.map.bind(mapInstance);
    return mapInstance;
  }

  generateType(typeName, fields) {
    return new Function(`
      return function ${upperFirst(typeName)}() {
        ${fields.map(field => `this['${field}'] = undefined;`).join('\n')}
      }
    `)();
  }

  registerConvention(name, convention) {
    this.conventionsFactory.register(name, convention);
  }

  extendMap(methodName, implementation) {
    this.MapInstance.prototype[methodName] = implementation;
  }

  get CAMEL_CASE_CONVENTION() {
    return CAMEL_CASE_CONVENTION;
  }

  get PASCAL_CASE_CONVENTION() {
    return PASCAL_CASE_CONVENTION;
  }

  get SNAKE_CASE_CONVENTION() {
    return SNAKE_CASE_CONVENTION;
  }

  [checkMapperArgs](convention, SourceType, DestType) {
    const invalidConstructors = [
      String, Number, Boolean, Date, RegExp, Array
    ];

    if (!this.conventionsFactory.has(convention)) {
      throw new Error('Unsupported convention.');
    }

    if (typeof SourceType !== 'function' || invalidConstructors.includes(SourceType)) {
      throw new Error('Unsupported source type. Source type should be constructor function (Object or custom)');
    }

    if (typeof DestType !== 'function' || invalidConstructors.includes(DestType)) {
      throw new Error('Unsupported destination type. Destination type should be constructor function (Object or custom)');
    }
  }
}

module.exports = Mapper;
'use strict';

const { upperFirst } = require('lodash');
const { CAMEL_CASE_CONVENTION, PASCAL_CASE_CONVENTION, SNAKE_CASE_CONVENTION } = require('./fieldConventions/constants');

const conventionsFactory = require('./fieldConventions/conventionsFactory');
const MapInstance = require('./mapInstance');

const checkMapperArgs = Symbol('_checkMapperArgs');

class Mapper {
  register(convention, methodName, SourceType, DestType, cb) {
    this[checkMapperArgs](convention, SourceType, DestType);

    const mapInstance = new MapInstance(conventionsFactory.get(convention), SourceType, DestType, cb);

    this[methodName] = mapInstance.map.bind(mapInstance);
  }

  geneateType(typeName, fields) {
    return new Function(`
      return function ${upperFirst(typeName)}() {
        ${fields.map(field => `${field} = undefined;`).join('\n')}
      }
    `)();
  }

  static registerConvention(name, convention) {
    conventionsFactory.register(name, convention);
  }

  static get CAMEL_CASE_CONVENTION() {
    return CAMEL_CASE_CONVENTION;
  }

  static get PASCAL_CONVENTION() {
    return PASCAL_CASE_CONVENTION;
  }

  static get SNAKE_CONVENTION() {
    return SNAKE_CASE_CONVENTION;
  }

  [checkMapperArgs](convention, SourceType, DestType) {
    const invalidConstructors = [
      String, Number, Boolean, Date, RegExp, Array
    ];

    if (!conventionsFactory.has(convention)) {
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
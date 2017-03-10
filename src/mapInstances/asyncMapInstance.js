'use strict';

const BaseMapInstance = require('./base');

class AsyncMapInstance extends BaseMapInstance {
  constructor(convention, SourceType, DestType, configCb) {
    super(convention, SourceType, DestType, configCb);
  }

  map(value) {
    const self = this;

    if (Array.isArray(value)) {
      return Promise.all(value.map(v => self._applyMap(v)));
    } else if (value) {
      return Promise.resolve(self._applyMap(value));
    } else {
      return Promise.resolve(null);
    }
  }

  _applyCustomMappings(value, destObj, customMappings) {
    const { destType } = this;

    return customMappings.reduce((result, [field, action]) => {
      if (destType.hasProperty(field)) {
        return result.then(action(value)).then((value) => {
          destObj[field] = value;
        });
      } else {
        return result;
      }
    }, Promise.resolve()).then(() => destObj);
  }
}

module.exports = AsyncMapInstance;
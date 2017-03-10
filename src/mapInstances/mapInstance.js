'use strict';

const BaseMapInstance = require('./base');

class MapInstance extends BaseMapInstance {
  constructor(convention, SourceType, DestType, configCb) {
    super(convention, SourceType, DestType, configCb);
  }

  map(value) {
    const self = this;

    if (Array.isArray(value)) {
      return value.map(v => self._applyMap(v));
    } else if (value) {
      return self._applyMap(value);
    } else {
      return null;
    }
  }

  _applyCustomMappings(value, destObj, customMappings) {
    const { destType } = this;

    customMappings.forEach(([field, action]) => {
      if (destType.hasProperty(field)) {
        destObj[field] = action(value);
      }
    });

    return destObj;
  }
}

module.exports = MapInstance;
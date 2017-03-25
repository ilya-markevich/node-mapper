'use strict';

const get = require('get-value');
const TypeWrapper = require('../typeWrapper');

class BaseMapInstance {
  constructor(convention, SourceType, DestType, configCb) {
    this.sourceType = new TypeWrapper(SourceType);
    this.destType = new TypeWrapper(DestType);

    this.convention = convention;
    this.mapInfo = new Map();
    this.convertCb = null;

    if (configCb) {
      configCb(this);
    }
  }

  mapField(name, mapTo) {
    const self = this;

    self.mapInfo.set(name, mapTo);
    return self;
  }

  ignoreField(name) {
    const self = this;

    self.mapInfo.set(name, null);
    return self;
  }

  mapFieldByPath(name, mapPath) {
    const self = this;

    self.mapInfo.set(name, value => get(value, mapPath));
    return self;
  }

  convert(cb) {
    const self = this;

    self.mapInfo.clear();
    self.convertCb = cb;
  }

  _applyMap(value) {
    const self = this;
    const { mapInfo, convertCb, destType } = self;

    if (convertCb) {
      return convertCb(value, destType.getType());
    } else if (mapInfo.size > 0) {
      return self._applyCustomMap(value);
    } else {
      return self._applyDefaultMap(value);
    }
  }

  _applyDefaultMap(value) {
    const { destType, sourceType, convention } = this;

    const destObj = destType.getInstance();
    const sourceFields = sourceType.getFields(value);

    sourceFields.forEach((sourceField) => {
      const fieldInDest = convention.getField(sourceField);

      if (sourceField in value && destType.hasProperty(fieldInDest)) {
        destObj[fieldInDest] = value[sourceField];
      }
    });

    return destObj;
  }

  _applyCustomMap(value) {
    const self = this;
    const { mapInfo, convention, sourceType, destType } = self;
    const destObj = destType.getInstance();
    const ignoreMappings = [], customFieldMappings = [], customMappings = [];

    [...mapInfo].forEach((info) => {
      const action = info[1];

      if (action === null) {
        ignoreMappings.push(info);
      } else if (typeof action === 'string') {
        customFieldMappings.push(info);
      } else {
        customMappings.push(info);
      }
    });

    ignoreMappings.forEach(([field]) => delete destObj[field]);

    customFieldMappings.forEach(([field, action]) => {
      destObj[field] = value[action];
    });

    sourceType.getFields(value)
      .filter(sourceField => !mapInfo.has(convention.getField(sourceField)))
      .forEach((field) => {
        const destField = convention.getField(field);

        if (destType.hasProperty(destField)) {
          destObj[destField] = value[field];
        }
      });

    return self._applyCustomMappings(value, destObj, customMappings);
  }
}

module.exports = BaseMapInstance;
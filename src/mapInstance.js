'use strict';

const { get } = require('lodash');
const TypeWrapper = require('./typeWrapper');

const applyMap = Symbol('_applyMap');
const applyCustomMap = Symbol('_applyCustomMap');
const applyDefaultMap = Symbol('_applyDefaultMap');

class MapInstance {
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

  map(value) {
    const self = this;

    if (Array.isArray(value)) {
      return value.map(v => self[applyMap](v));
    } else {
      return self[applyMap](value);
    }
  }

  [applyMap](value) {
    const self = this;
    const { mapInfo, convertCb, destType } = self;

    if (convertCb) {
      return convertCb(value, destType.getType());
    } else if (mapInfo.size > 0) {
      return self[applyCustomMap](value);
    } else {
      return self[applyDefaultMap](value);
    }
  }

  [applyCustomMap](value) {
    const { mapInfo, convention, sourceType, destType } = this;
    const destObj = destType.getInstance();

    mapInfo.forEach((action, field) => {
      if (action === null) {
        delete destObj[field];
      } else if (destType.hasProperty(field)) {
        destObj[field] = typeof action === 'string' ? value[action] : action(value);
      }
    });

    sourceType.getFields(value)
      .filter(sourceField => !mapInfo.has(convention.getField(sourceField)))
      .forEach((field) => {
        const destField = convention.getField(field);

        if (destType.hasProperty(destField)) {
          destObj[destField] = value[field];
        }
      });

    return destObj;
  }

  [applyDefaultMap](value) {
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
}

module.exports = MapInstance;
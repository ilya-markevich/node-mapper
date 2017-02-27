'use strict';

class TypeWrapper {
  constructor(Type) {
    this.type = Type;
    this.typeInstance = Reflect.construct(Type, []);
    this.isSimpleObject = Type === Object;
  }

  getFields(value) {
    const self = this;

    if (self.isSimpleObject) {
      return Object.keys(value);
    } else {
      return Object.keys(self.getInstance());
    }
  }

  getInstance() {
    return Object.assign({}, this.typeInstance);
  }

  hasProperty(name) {
    const self = this;

    if (self.isSimpleObject) {
      return true;
    } else {
      return self.typeInstance.hasOwnProperty(name);
    }
  }
}

module.exports = TypeWrapper;
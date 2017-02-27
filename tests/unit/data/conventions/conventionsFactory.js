'use strict';

const newConventionName = 'test';
const fakeConventionName = 'test fake';

class NewConvention {
  constructor() {
    this.name = newConventionName;
  }

  getField() {
    return 'test';
  }
}

module.exports = {
  newConventionName,
  NewConvention,
  fakeConventionName
};
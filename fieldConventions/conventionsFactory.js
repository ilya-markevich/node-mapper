'use strict';

const conventions = Symbol('_conventions');
const { CAMEL_CASE_CONVENTION, PASCAL_CASE_CONVENTION, SNAKE_CASE_CONVENTION } = require('./constants');

class ConventionFactory {
  constructor() {
    this[conventions] = new Map();
  }

  register(name, Convention) {
    const self = this;

    self[conventions].set(name, new Convention());
    return self;
  }

  get(name) {
    return this[conventions].get(name);
  }

  has(name) {
    return this[conventions].has(name);
  }
}

const conventionFactory = new ConventionFactory();

conventionFactory
  .register(CAMEL_CASE_CONVENTION, require('./camelCase'))
  .register(PASCAL_CASE_CONVENTION, require('./pascalCase'))
  .register(SNAKE_CASE_CONVENTION, require('./snakeCase'));

module.exports = conventionFactory;
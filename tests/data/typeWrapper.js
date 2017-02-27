'use strict';

const CustomConstructor = function CustomConstructor() {};

const simpleObject = {
  field1: 'test',
  field2: 'test2'
};
const simpleObjectFields = ['field1', 'field2'];

function CustomObjectConstructor() {
  this.field1 = undefined;
  this.field2 = undefined;
  this.field3 = undefined;
}
const customObjectFields = ['field1', 'field2', 'field3'];

const fieldInObject = 'field1';
const fieldNotInObject = 'field8';

module.exports = {
  CustomConstructor,
  simpleObject,
  simpleObjectFields,
  CustomObjectConstructor,
  customObjectFields,
  fieldInObject,
  fieldNotInObject
};
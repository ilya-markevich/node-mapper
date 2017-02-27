'use strict';

const { CAMEL_CASE_CONVENTION } = require('../../../src/fieldConventions/constants');

const sourceType = Object;
const destType = Object;
const convention = CAMEL_CASE_CONVENTION;

function configCb() {
  return null;
}

function convertCb() {
  return 'test';
}

const mapFieldName = 'test';
const mapFieldValue = 'testDest';

const fieldToIgnore = 'test';
const fieldPath = 'test.a';

module.exports = {
  sourceType,
  destType,
  convention,
  configCb,
  mapFieldName,
  mapFieldValue,
  fieldToIgnore,
  fieldPath,
  convertCb
};
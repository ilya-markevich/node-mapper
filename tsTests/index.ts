import Mapper = require('../index');

const mapper = new Mapper();

class CustomSource {}

class CustomDestination {}

const NewType = mapper.generateType('testType', ['prop1', 'prop2']);

mapper.register(mapper.CAMEL_CASE_CONVENTION, 'testMap', Object, NewType);

mapper.register(mapper.PASCAL_CASE_CONVENTION, 'testMap2', CustomSource, CustomDestination);

mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap3', CustomSource, Object, (mapping) => {
  mapping.mapField('prop1', 'prop1Source');

  mapping.mapField('prop2', obj => obj.prop2Source);

  mapping.ignoreField('prop3');

  mapping.mapFieldByPath('prop4', 'prop2Source.prop1');
});

mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap4', Object, CustomDestination, (mapping) => {
  mapping.convert((obj) => {
    return {
      prop1: obj.test1,
      prop2: obj.test2
    };
  });
});

mapper.extendMap('mapTest', value => value.prop1);

mapper.registerConvention('newConvention', {
  getField(fieldName) {
    return `test${fieldName}`;
  }
});

mapper['testMap']([
  {
    prop1: 'test'
  }
]);

mapper['testMap2']({
  prop1: 'test'
});
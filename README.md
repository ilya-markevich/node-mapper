# Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Conventions](#conventions)
* [Source and destination types](#sourcedesttypes)
* [API](#api)
  - [Mapper instance](#mapper-instance)
    + [`mapper.register()]`](#mapperregister)
    + [`mapper.generateType()`](#mappergeneratetype)
    + [`mapper.registerConvention()`](#mapperregisterconvention)
    + [`mapper.extendMap()`](#mapperextendmap)
    + [`mapper.CAMEL_CASE_CONVENTION`](#mappercamelcase)
    + [`mapper.PASCAL_CASE_CONVENTION`](#mapperpascalcase)
    + [`mapper.SNAKE_CASE_CONVENTION`](#mappersnakecase)
  - [Mapping instance](#mapping-instance)
    + [`mapping.mapField()`](#mappingmapfield)
    + [`mapping.mapFieldByPath()`](#mappingmapfieldbypath)
    + [`mapping.ignoreField()`](#mappingingorefield)
* [What's in a name?](#whats-in-a-name)
* [Author](#author)

# Installation

```
npm install dee-mapper --save
```
NodeJS >=6.0.0 required

# Usage

To use the mapper you need to accomplish 3 simple steps:

1) Create mapper instance.

* Just import `dee-mapper` and call it with `new` keyword.

2) Register new mapping.

* Specify [fields convention](#conventions), mapping method name,
[source](#sourcedesttypes) object type, [destination](#sourcedesttypes) object type
and a configuration callback (optionally).
Configuration callback is used for mapping customizations.
 
3) Call the method from step 2 on a mapper instance.

The example of code:

```javascript
const Mapper = require('dee-mapper');
const mapper = new Mapper(); // step 1: create mapper instance

// step 2: register new map instance
mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap', Object, Object, (map) => {
  // here 'map' is mapping instance
  // you can configure the instance to customize mapping
   
  map.ignoreField('field_3')
    .mapField('field_2', obj => obj.field2.toUpperCase())
    .mapFieldByPath('field_1', 'field1');
});

// step 3: call the method from step 2 on a mapper instance
mapper.testMap({
  field1: 'test1',
  field2: 'test2',
  field3: 'test3'
});
// In result: { field_1: 'test1', field_2: 'TEST2' }
```

# Conventions
Conventions are responsible for converting by default field names of source object in appropriate field names of destination object.

For example, snake case convention means that field with name 'firstName' in source object will be mapped by default to 'first_name' in destination object.
Dee-mapper supports 3 types of conventions: [camel case](https://en.wikipedia.org/wiki/Camel_case), [pascal case](https://en.wikipedia.org/wiki/PascalCase) and [snake case](https://en.wikipedia.org/wiki/Snake_case).

You can create custom conventions using method [registerConvention](#instanceregisterconvention).

# Source and destination types

For source and destination objects you can use simple types and custom types. Simple type is only one - Object.
Custom types - all user defined types.

Type can be constructor function or class. The result of mapping depends on types that you passed when configure the mapping.
Here are the rules (in format source type -> destination type) that applied for mapping types:

1) Simple -> Simple
 
* all fields from source type will be converted by convention and mapped to destination type.

```javascript
const sourceType = Object;
const destinationType = Object;

mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap', sourceType, destinationType);

const result = mapper.testMap({
  field1: 'test1',
  field2: 'test2',
  field3: 'test3'
});

console.log(result); //{ field_1: 'test1', field_2: 'test2', field_3: 'test3' }
console.log(result instanceof Object); // true
```

2) Simple -> Custom

* only fields from source value converted by convention that's included in Custom type will be in a result.

```javascript
const sourceType = Object;
class DestinationType {
  constructor() {
    this.field_2 = undefined;
    this.field_3 = undefined;
  }
}

mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap', sourceType, DestinationType);

const result = mapper.testMap({
  field1: 'test1',
  field2: 'test2',
  field3: 'test3',
  field4: 'test4'
});

console.log(result); //{ field_2: 'test2', field_3: 'test3' }
console.log(result instanceof DestinationType); // true
```

3) Custom -> Simple

* only fields from source value that's included in source custom type will be in a result.

```javascript
class SourceType {
  constructor() {
    this.field1 = undefined;
    this.field2 = undefined;
  }
}
const destinationType = Object;

mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap', SourceType, destinationType);

const result = mapper.testMap({
  field1: 'test1',
  field2: 'test2',
  field3: 'test3',
  field4: 'test4'
});

console.log(result); //{ field_1: 'test1', field_2: 'test2' }
console.log(result instanceof Object); // true
```

4) Custom -> Custom

* only fields from source value that's included in source type will be in a result.

```javascript
class SourceType {
  constructor() {
    this.field1 = undefined;
    this.field2 = undefined;
  }
}
class DestinationType {
  constructor() {
    this.field_2 = undefined;
    this.field_3 = undefined;
  }
}

mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap', SourceType, DestinationType);

const result = mapper.testMap({
  field1: 'test1',
  field2: 'test2',
  field3: 'test3',
  field4: 'test4'
});

console.log(result); //{ field_2: 'test2' }
console.log(result instanceof DestinationType); // true
```

# API

## Mapper instance
   
### `mapper.register(conventionName, methodName, SourceType, DestType[, configCb])`
Register new map for the mapper.

Args:

* `conventionName [String]`: name of [fields convention](#conventions).
* `methodName [String]`: name of method on mapper instance.
* `SourceType [Function]`: type of source object.
* `DestType [Function]`: type of destination object.
* `configCb [Function]`: optional. Function for additional mapping configuration. [Mapping instance](#mapping-instance) is passed as parameter.

### `mapper.generateType(typeName, fields)`
Generates new custom type. Use the method as a helper if you don't want to write boilerplate code like:
       
```javascript
function TypeName() {
    this.field1 = undefined;
    this.field2 = undefined;
}

// the same using mapper.generateType
const TypeName = mapper.generateType('TypeName', ['field1', 'field2']);
```
 
Args:

* `typeName [String]`: type name.
* `fields Array([String])`: array of fields that will be created for the type.

Returns: custom type function constructor

### `mapper.registerConvention(conventionName, ConventionImplementation)`   
Register new field convention. See [conventions](#conventions) for more details.

Args:

* `conventionName [String]`: name of the convention.
* `ConventionImplementation [Function]`: function constructor of the convention.

Object that is created with ConventionImplementation constructor should have method `getField`.

Example of upper case convention (each field name will be transformed to upper case field name):

```javascript
class Convention {
    getField(sourceFieldName) {
        return sourceFieldName.toUpperCase();
    }
}
```
   
### `mapper.extendMap(methodName, implementation)`
Extend [mapping instance](#mapping-instance) with custom method.

Args:

* `methodName [String]`: name of the method.
* `implementation [Function]`: function that takes as a parameter source object.

### `mapper.CAMEL_CASE_CONVENTION
Constant for camel case convention. You don't have to implement the convention manually.
 
### mapper.PASCAL_CASE_CONVENTION
Constant for pascal case convention. You don't have to implement the convention manually.
 
### mapper.SNAKE_CASE_CONVENTION`
Constant for snake case convention. You don't have to implement the convention manually.

## Map instance

### `mapping.mapField(destFieldName, sourceFieldNameOrCallback)`

### `mapping.mapFieldByPath(destFieldName, pathInSourceObj)`

### `mapping.ignoreField(destFieldName)`

# What's in a name?
I guess the part with 'mapper' is clear. As for 'dee' that's one of my favorite detective characters - [Judge Dee](https://en.wikipedia.org/wiki/Judge_Dee).

# Author

Ilya Markevich - [@ilya_mark91](https://twitter.com/ilya_mark91)

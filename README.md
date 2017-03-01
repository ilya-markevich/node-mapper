# Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Conventions](#conventions)
* [API](#api)
  - [Mapper instance](#mapper-instance)
    + [`instance.register(conventionName, methodName, SourceType, DestType, configCb)`](#instanceregister)
    + [`instance.generateType(typeName, fields)`](#instancegeneratetype)
    + [`instance.registerConvention(conventionName, ConventionImplementation)`](#instanceregisterconvention)
    + [`instance.extendMap(methodName, implementation)`](#instanceextendmap)
    + [`instance.CAMEL_CASE_CONVENTION`](#instancecamelcase)
    + [`instance.PASCAL_CASE_CONVENTION`](#instancepascalcase)
    + [`instance.SNAKE_CASE_CONVENTION`](#instancesnakecase)
  - [Map instance](#mapinstance)
* [What about name?](#what-about-name)
* [Author](#author)

# Installation

```
npm install dee-mapper --save
```
NodeJS >=6.0.0 required

# Usage

ABOUT simple and custom types and rules of usage

The example of code:

```javascript
const Mapper = require('dee-mapper');
const mapper = new Mapper(); // create mapper instance

mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap', Object, Object, (map) => {
  // here 'map' is map instance
   
  map.ignoreField('field_3')
    .mapField('field_2', obj => obj.field2.toUpperCase())
    .mapFieldByPath('field_1', 'field1');
});

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

# API

## Mapper instance
   
### `instance.register(conventionName, methodName, SourceType, DestType, configCb)`
Register new map for mapper.

Args:

* `conventionName [String]`: name of [fields convention](#conventions).
* `methodName [String]`: name of method on mapper instance.
* `SourceType [Function]`: source type of mapping.
* `DestType [Function]`: destination type of mapping.
* `configCb [Function]`: function for additional map configuration. [Map instance](#mapinstance) is passed as parameter.

### `instance.generateType(typeName, fields)`
Generates new custom type. Use the method as a helper if you don't want to write boilerplate code:
       
```javascript
function TypeName() {
    this.field1 = undefined;
    this.field2 = undefined;
}

// the same using instance.generateType
const TypeName = mapper.generateType('TypeName', ['field1', 'field2']);
```
 
Args:

* `typeName [String]`: type name.
* `fields Array([String])`: array of fields that will be created for the type.

Returns: custom type function constructor

### `instance.registerConvention(conventionName, ConventionImplementation)`   
Register new field convention. See [conventions](#conventions) for more details.

Args:

* `conventionName [String]`: name of a convention.
* `ConventionImplementation [Function]`: function constructor of the convention.

Object that is created with ConventionImplementation constructor should have method `getField`.
Example of upper case convention (each field name will be transformed to upper case field name):
```javascript
class Convention() {
    getField(name) {
        return name.toUpperCase();
    }
}
```
   
### `instance.extendMap(methodName, implementation)`
Extend map instance with custom method.

Args:

* `methodName [String]`: name of method.
* `implementation [Function]`: function that takes as parameter source object.

### `instance.CAMEL_CASE_CONVENTION, instance.PASCAL_CASE_CONVENTION, instance.SNAKE_CASE_CONVENTION`
Constants for predefined conventions. You don't have to implement the conventions manually.

## Map instance


  
# What about name?
I guess the part with 'mapper' is clear. As for 'dee' that's one of my favorite detective characters - [Judge Dee](https://en.wikipedia.org/wiki/Judge_Dee).

# Author

Ilya Markevich - [@ilya_mark91](https://twitter.com/ilya_mark91)

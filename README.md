# Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
  - [Mapper instance](#mapper-instance)
    + [`instance.register(conventionName, methodName, SourceType, DestType, configCb)`](#instanceregister)
    + [`instance.generateType(typeName, fields)`](#instancegeneratetype)
    + [`instance.registerConvention(conventionName, ConventionImplementation)`](#instanceregisterconvention)
    + [`instance.extendMap(methodName, implementation)`](#instanceextendmap)
    + [`instance.CAMEL_CASE_CONVENTION`](#instancecamelcase)
    + [`instance.PASCAL_CASE_CONVENTION`](#instancepascalcase)
    + [`instance.SNAKE_CASE_CONVENTION`](#instancesnakecase)
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
const mapper = new Mapper();


mapper.register(mapper.SNAKE_CASE_CONVENTION, 'testMap', Object, Object, (map) => {
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
# API
  ## `Mapper instance`
   
  ### `instance.register(conventionName, methodName, SourceType, DestType, configCb)`
  Register new map for mapper.
  conventionName [String] - name of field convention #link to conventions
  methodName [String] - name of method on mapper instance
  SourceType [Function] - source type of mapping
  DestType [Function] - destination type of mapping
  configCb [Function] - function for additional map configuration. mapInstance #link to map instance is passed as parameter
      
   ### `instance.generateType(typeName, fields)` 
       For custom source and destination types we need to write some boilerplate code like
       ```javascript
       
       ```
      
      
  Conventions: Conventions are responsible for converting by default field names of source object in field
   names of destination object. The mapper supports 3 types of conventions:
   camel case (fieldName),
   pascal case (FieldName),
   snake case (field_name)
   
   

# What about name?
I guess the part with 'mapper' is clear. As for 'dee' that's one of my favorite detective characters - [Judge Dee](https://en.wikipedia.org/wiki/Judge_Dee).

# Author

Ilya Markevich - [@ilya_mark91](https://twitter.com/ilya_mark91)

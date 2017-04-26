declare namespace Mapper {
  type mapCb = (obj: any) => any;

  interface Convention {
    getField(fieldName: string): any;
  }

  interface FunctionConstructor {
    new(): any
  }

  class BaseMapInstance {
    mapField(name: string, mapTo: string | mapCb): BaseMapInstance;

    ignoreField(name: string): BaseMapInstance;

    mapFieldByPath(name: string, mapPath: string): BaseMapInstance;

    convert(cb: (value: any, destType: any) => any): void;
  }

  type CAMEL_CASE_CONVENTION = 'camelCase';

  type PASCAL_CASE_CONVENTION = 'pascalCase';

  type SNAKE_CASE_CONVENTION = 'snakeCase';
}

declare class Mapper {
  register(convention: string, methodName: string, SourceType: Mapper.FunctionConstructor, DestinationType: Mapper.FunctionConstructor,
           cb?: (mapping: Mapper.BaseMapInstance) => void): void;

  generateType(typeName: string, fields: string[]): Mapper.FunctionConstructor;

  registerConvention(name: string, convention: Mapper.Convention): void;

  extendMap(methodName: string, implementation: (value: any) => any): void;

  CAMEL_CASE_CONVENTION: Mapper.CAMEL_CASE_CONVENTION;

  PASCAL_CASE_CONVENTION: Mapper.PASCAL_CASE_CONVENTION;

  SNAKE_CASE_CONVENTION: Mapper.SNAKE_CASE_CONVENTION;
}

export = Mapper;
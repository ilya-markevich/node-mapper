declare type mapCb = (obj: Object) => any;

declare interface Convention {
    getField(fieldName: string): any;
}

declare class BaseMapInstance {
    mapField(name: string, mapTo: string | mapCb): BaseMapInstance;

    ignoreField(name: string): BaseMapInstance;

    mapFieldByPath(name: string, mapPath: string): BaseMapInstance;

    convert(cb: (value: Object, destType: Object) => Object): void;
}

declare type CAMEL_CASE_CONVENTION = 'camelCase';

declare type PASCAL_CASE_CONVENTION = 'pascalCase';

declare type SNAKE_CASE_CONVENTION = 'snakeCase';

export default class Mapper {
    register(convention: string, methodName: string, SourceType: Object, DestinationType: Object, cb?: (mapping: BaseMapInstance) => void): void;

    generateType(typeName: string, fields: string[]): FunctionConstructor;

    registerConvention(name: string, convention: Convention): void;

    extendMap(methodName: string, implementation: (value: any) => any): void;

    get CAMEL_CASE_CONVENTION(): CAMEL_CASE_CONVENTION

    get PASCAL_CASE_CONVENTION(): PASCAL_CASE_CONVENTION

    get SNAKE_CASE_CONVENTION(): SNAKE_CASE_CONVENTION
}
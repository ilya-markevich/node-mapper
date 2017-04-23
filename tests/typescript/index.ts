import Mapper from '../../index';

const mapper = new Mapper();

mapper.register(mapper.CAMEL_CASE_CONVENTION, 'testMap', Object, Object);
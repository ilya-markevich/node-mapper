'use strict';

module.exports = ({ Convention, name, fieldsData }) => {
  let convention;

  before(() => {
    convention = new Convention();
  });

  describe('Initial State', () => {
    it('should get correct name for the convention', () => {
      convention.should.have.property('name', name);
    });
  });

  describe('#getField', () => {
    it('should get correct convention field name', () => {
      Object.keys(fieldsData).should.matchEach((field) => {
        convention.getField(field).should.be.eql(fieldsData[field]);
      });
    });
  });
};
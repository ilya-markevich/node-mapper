'use strict';

function checkResult(testData, result, expectedResult, isTypeCheck, isAsync) {
  function checkType(result, isTypeCheck) {
    if (isTypeCheck) {
      const { DestCustomType } = testData;

      (result instanceof DestCustomType).should.be.eql(true);
    }
  }

  function checkIsArray(result, expectedResult) {
    if (Array.isArray(result)) {
      result.forEach((value, index) => {
        value.should.have.properties(expectedResult[index]);
      });
    } else {
      result.should.have.properties(expectedResult);
    }
  }

  if (isAsync) {
    return result.then((actualResult) => {
      checkIsArray(actualResult, expectedResult);
      checkType(actualResult, isTypeCheck);
    });
  } else {
    checkIsArray(result, expectedResult);
    checkType(result, isTypeCheck);
  }
}

function checkNullResult(result, isAsync) {
  if (isAsync) {
    return result.then((actualResult) => {
      (actualResult === null).should.be.eql(true);
    });
  } else {
    (result === null).should.be.eql(true);
  }
}

module.exports = {
  checkResult,
  checkNullResult
};
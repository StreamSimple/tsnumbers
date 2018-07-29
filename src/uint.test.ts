import * as chai from 'chai';
import {isUInt, maskUInt} from './uint';

const expect = chai.expect;

describe('UInt', () => {
  describe('isInteger tests', () => {
    it('should say the number is an integer.', () => {
      expect(isUInt(0x8FFFFFFF)).to.be.true;
    });
  });
});
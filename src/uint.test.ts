import * as chai from 'chai';
import {isUInt, maskUInt} from './uint';

const expect = chai.expect;

describe('UInt', () => {
  describe('isInteger tests', () => {
    it('should say the number is an unsigned integer.', () => {
      expect(isUInt(0x8FFFFFFF)).to.be.true;
    });

    it('should say the number is not an unsigned integer.', () => {
      expect(isUInt(-1)).to.be.false;
    });

    it('should say that doubles are not unsigned integers.', () => {
      expect(isUInt(1.1)).to.be.false;
    });
  });
});
import * as chai from 'chai';
import {isUInt, maskUInt} from './uint';

const expect = chai.expect;

describe('UInt', () => {
  describe('maskUInt tests', () => {
    it('should mask 32 bits correct.y.', () => {
      let val = 0xFEDCA987;
      expect(maskUInt(val)).to.eq(val);
    });

    it('should mask more than 32 bits correct.y.', () => {
      let val = 0xFEDCA987FEDCA;
      expect(maskUInt(val)).to.eq(0x987FEDCA);
    });
  });

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
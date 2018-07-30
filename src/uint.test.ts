import * as chai from 'chai';
import {isUInt, maskUInt, UInt} from './uint';

const expect = chai.expect;

describe('UInt', () => {
  describe('add tests', () => {
    it('should add two small integers correctly', () => {
      let actual = new UInt(11).add(new UInt(12)).toString();
      expect(actual).to.eq('23');
    });

    it('should add two large integers correctly', () => {
      let actual = new UInt(0x0FED1000).add(new UInt(0x00001234)).toHexString();
      expect(actual).to.eq('fed2234');
    });

    it ('should handle sign bit correctly', () => {
      let actual = new UInt(0x40000000).add(new UInt(0x40000001)).toHexString();
      expect(actual).to.eq('80000001');
    });

    it ('should handle overflow correctly', () => {
      let actual = new UInt(0xF0000000).add(new UInt(0x20000001)).toHexString();
      expect(actual).to.eq('10000001');
    })
  });

  describe('maskUInt tests', () => {
    it('should mask 32 bits correct.y.', () => {
      let val = 0xFEDCA987;
      expect(maskUInt(val)).to.eq(val);
    });

    it('should mask more than 32 bits correctly.', () => {
      let val = 0xFEDCA987FEDCA;
      expect(maskUInt(val)).to.eq(0x987FEDCA);
    });

    it('should mask negative numbers correctly.', () => {
      expect(maskUInt(-2)).to.eq(0xFFFFFFFE);
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
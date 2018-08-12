import * as chai from 'chai';
import {UInt} from './uint';

const expect = chai.expect;

describe('UInt', () => {
  describe('add tests', () => {
    it('should add two small integers correctly', () => {
      let actual = new UInt(11).add(new UInt(12)).toString();
      expect(actual).to.eq('23');
    });

    it('should add two large integers correctly', () => {
      let actual = new UInt(0x0FED1000).add(new UInt(0x00001234)).toString(16);
      expect(actual).to.eq('fed2234');
    });

    it ('should handle sign bit correctly', () => {
      let actual = new UInt(0x40000000).add(new UInt(0x40000001)).toString(16);
      expect(actual).to.eq('80000001');
    });

    it ('should handle overflow correctly', () => {
      let actual = new UInt(0xF0000000).add(new UInt(0x20000001)).toString(16);
      expect(actual).to.eq('10000001');
    })
  });

  describe('sub tests', () => {
    it('should subtract a smaller integer correctly', () => {
      let actual = new UInt(1000).sub(new UInt(123)).toString();
      expect(actual).to.eq('877');
    });

    it('should underflow correctly', () => {
      let actual = new UInt(1000).sub(new UInt(2155)).toString(16);
      expect(actual).to.eq('fffffb7d');
    });

    it('should handle subtracting largest value correctly.', () => {
      let actual = new UInt(0).sub(new UInt(0xFFFFFFFF)).toString();
      expect(actual).to.eq('1');
    })
  });

  describe('mult tests', () => {
    it('should multiply small integers correctly.', () => {
      let actual = new UInt(1000).mult(new UInt(123)).toString();
      expect(actual).to.eq('123000');
    });

    it('should overflow correctly 1', () => {
      let actual = new UInt(0x00FFFF00).mult(new UInt(0x00001000)).toString(16);
      expect(actual).to.eq('fff00000');
    });

    it('should overflow correctly 2', () => {
      let actual = new UInt(0xFFFFFFFF).mult(new UInt(0x10000000)).toString(16);
      expect(actual).to.eq('f0000000');
    });
  });

  describe('xor tests', () => {
    it('should xor bits correctly.', () => {
      let actual = new UInt(0xF5).xor(new UInt(0xFA)).toNumber();
      expect(actual).to.eq(0xF);
    });
  });

  describe('maskUInt tests', () => {
    it('should mask 32 bits correctly.', () => {
      let val = 0xFEDCA987;
      expect(UInt.maskUInt(val)).to.eq(val);
    });

    it('should mask more than 32 bits correctly.', () => {
      let val = 0xFEDCA987FEDCA;
      expect(UInt.maskUInt(val)).to.eq(0x987FEDCA);
    });

    it('should mask negative numbers correctly.', () => {
      expect(UInt.maskUInt(-2)).to.eq(0xFFFFFFFE);
    });
  });

  describe('isInteger tests', () => {
    it('should say the number is an unsigned integer.', () => {
      expect(UInt.isUInt(0x8FFFFFFF)).to.be.true;
    });

    it('should say the number is not an unsigned integer.', () => {
      expect(UInt.isUInt(-1)).to.be.false;
    });

    it('should say that doubles are not unsigned integers.', () => {
      expect(UInt.isUInt(1.1)).to.be.false;
    });
  });
});
import * as chai from 'chai';
import {isUInt, maskUInt, UInt} from './uint';

const expect = chai.expect;

describe('ULong', () => {
  describe('add tests', () => {
    it('should add two small integers correctly', () => {
    });
  });

  describe('xor tests', () => {
    it('should xor bits correctly.', () => {
      let actual = new UInt(0xF5).xor(new UInt(0xFA)).toNumber();
      expect(actual).to.eq(0xF);
    });
  });

  describe('parseLongHex tests', () => {
    it('should mask 32 bits correctly.', () => {
      let val = 0xFEDCA987;
      expect(maskUInt(val)).to.eq(val);
    });
  });

  describe('createLong tests', () => {
    it('should say the number is an unsigned integer.', () => {
      expect(isUInt(0x8FFFFFFF)).to.be.true;
    });
  });
});

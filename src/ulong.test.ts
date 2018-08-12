import * as chai from 'chai';
import {ULong} from './ulong';
const expect = chai.expect;

describe('ULong', () => {
  describe('get msb and get lsb test', () => {
    it('should get msb and lsb correctly', () => {
      let testULong = ULong.parseLong('1111222233334444', 16);
      expect(testULong.getMs32b().toString(16)).to.eq('11112222');
      expect(testULong.getLs32b().toString(16)).to.eq('33334444');
    });
  });
});

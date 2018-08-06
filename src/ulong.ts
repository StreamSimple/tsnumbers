import {IllegalNumberException} from './illegalnumber';
import {isWhole} from './numberutils';
import {maskUInt, UInt} from './uint';

export class ULong {
  private msb: UInt;
  private lsb: UInt;

  /**
   * @param {string} val A hex string.
   */
  private constructor(lsb: UInt, msb: UInt) {
  }

  public add(that: ULong): ULong {
    let newLsbNum = this.lsb.toNumber() + that.lsb.toNumber();
    let newLsb = new UInt(maskUInt(newLsbNum));
    let newMsb = new UInt(0);

    if (newLsbNum > UInt.MAX_UINT_NUMBER) {
      newMsb = new UInt(1);
    }

    newMsb = newMsb.add(this.msb).add(that.msb);
    return new ULong(newLsb, newMsb);
  }

  public xor(that: ULong): ULong {
    return new ULong(this.msb.xor(that.msb), this.lsb.xor(that.lsb));
  }

  public toHexString(): string {
    return this.msb.toHexString() + this.lsb.toHexString();
  }

  public static parseLong(val: string): ULong {
    // Assuming this is valid input for now
    let msb = new UInt(0);

    if (val.length > 8) {
      let msbNumDigits = val.length - 8;
      let msbHexString = val.substr(0, msbNumDigits);
      msb = new UInt(parseInt(msbHexString, 16));
      val = val.substr(msbNumDigits);
    }

    let lsb = new UInt(parseInt(val));
    return new ULong(lsb, msb);
  }

  public static createLong(val: number): ULong {
    if (val < 0) {
      throw new IllegalNumberException("The given number cannot be negative.");
    }

    if (!isWhole(val)) {
      throw new IllegalNumberException("The given number must be a whole numbber.");
    }

    return ULong.parseLong(val.toString());
  }
}
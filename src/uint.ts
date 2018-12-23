import {IllegalNumberException} from './illegalnumber';
import bigInt = require('big-integer');

export class UInt {
  public static readonly MAX_INT_NUMBER = 0x7FFFFFFF;
  public static readonly SIGN_BIT_MASK = 0x80000000;
  public static readonly MAX_UINT_NUMBER = 0xFFFFFFFF;
  public static readonly MAX_UINT_BIGIINT = bigInt(UInt.MAX_UINT_NUMBER);
  public static readonly MAX_UINT = new UInt(0xFFFFFFFF);

  public constructor(private val: number) {
    // Assuming this is valid input for now

    if (val < 0) {
      throw new IllegalNumberException("The given number cannot be negative.");
    }

    if (!UInt.isUInt(val)) {
      throw new IllegalNumberException("The given number must be an integer.");
    }
  }

  public add(that: UInt): UInt {
    return new UInt(UInt.maskUInt(this.val + that.val));
  }

  public sub(that: UInt): UInt {
    return new UInt(UInt.maskUInt(this.val - that.val));
  }

  public mult(that: UInt): UInt {
    let result = bigInt(this.val).
      multiply(bigInt(that.val)).
      and(UInt.MAX_UINT_BIGIINT).
      toJSNumber();
    return new UInt(result);
  }

  public xor(that: UInt): UInt {
    return new UInt(this.val ^ that.val);
  }

  public toString(radix?: number): string {
    return this.val.toString(radix);
  }

  public toNumber(): number {
    return this.val;
  }

  public static parseInt(valString: string, radix?: number): UInt {
    let parsedInt = bigInt(valString, radix);

    if (parsedInt.isNegative()) {
      throw new IllegalNumberException("The given number cannot be negative.");
    }

    if (parsedInt.gt(UInt.MAX_UINT_BIGIINT)) {
      throw new IllegalNumberException("The given number is larger than a uint.");
    }

    return new UInt(parsedInt.toJSNumber());
  }

  /**
   * Note this method can only mask 52 bit or smaller numbers correctly.
   * @param {number} val The number to bit mask.
   * @returns {number} A 32 bit number.
   */
  public static maskUInt(val: number): number {
    let hasSignBit = (val & UInt.SIGN_BIT_MASK) !== 0;
    let maskedVal = val & UInt.MAX_INT_NUMBER;

    if (hasSignBit) {
      maskedVal += UInt.SIGN_BIT_MASK;
    }

    return maskedVal;
  }

  public static isUInt(val: number): boolean {
    return UInt.maskUInt(val) === val;
  }
}

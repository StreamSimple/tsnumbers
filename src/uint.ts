import {IllegalNumberException} from './illegalnumber';

export const MAX_INT_VALUE = 0x7FFFFFFF;
export const INT_MASK = 0xFFFFFFFF;
export const SIGN_BIT_MASK = 0x80000000;

export class UInt {
  public static readonly MAX_UINT_NUMBER = 0xFFFFFFFF;
  public static readonly MAX_UINT = new UInt(0xFFFFFFFF);

  public constructor(private val: number) {
    // Assuming this is valid input for now

    if (val < 0) {
      throw new IllegalNumberException("The given number cannot be negative.");
    }

    if (!isUInt(val)) {
      throw new IllegalNumberException("The given number must be an integer.");
    }
  }

  public add(that: UInt): UInt {
    return new UInt(maskUInt(this.val + that.val));
  }

  public sub(that: UInt): UInt {
    return new UInt(maskUInt(this.val - that.val));
  }

  public mult(that: UInt): UInt {
    return new UInt(maskUInt(this.val * that.val));
  }

  public xor(that: UInt): UInt {
    return new UInt(this.val ^ that.val);
  }

  public toString(): string {
    return this.val.toString();
  }

  public toHexString(): string {
    return this.val.toString(16);
  }

  public toNumber(): number {
    return this.val;
  }
}

/**
 * Note this method can only mask 52 bit or smaller numbers correctly.
 * @param {number} val The number to bit mask.
 * @returns {number} A 32 bit number.
 */
export function maskUInt(val: number): number {
  let hasSignBit = (val & SIGN_BIT_MASK) !== 0;
  let maskedVal = val & MAX_INT_VALUE;

  if (hasSignBit) {
    maskedVal += SIGN_BIT_MASK;
  }

  return maskedVal;
}

export function isUInt(val: number): boolean {
  return maskUInt(val) === val;
}
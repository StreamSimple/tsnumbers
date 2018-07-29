import {IllegalNumberException} from './illegalnumber';
import {isInteger} from './numutils';

export class UInt {
  public static readonly INT_MASK = 0xFFFFFFFF;

  public constructor(private val: number) {
    // Assuming this is valid input for now

    if (val < 0) {
      throw new IllegalNumberException("The given number cannot be negative.");
    }

    if (!isInteger(val)) {
      throw new IllegalNumberException("The given number must be an integer.");
    }
  }

  public add(that: UInt): UInt {
    return new UInt((this.val + that.val) & UInt.INT_MASK);
  }

  public sub(that: UInt): UInt {
    return new UInt((this.val - that.val) & UInt.INT_MASK);
  }

  public toString(): string {
    return this.val.toString();
  }

  public toHexString(): string {
    return this.val.toString(16);
  }
}

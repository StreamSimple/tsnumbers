import {IllegalNumberException} from './illegalnumber';
import {isWhole} from './numberutils';
import {UInt} from './uint';
import bigInt = require('big-integer');
import {BigInteger} from 'big-integer';

export class ULong {
  public static MASK_LONG = bigInt('ffffffffffffffff');
  public static MASK_MS32B = bigInt('ffffffff00000000');
  public static MASK_LS32B = bigInt('00000000ffffffff');

  private readonly msb: UInt;
  private readonly lsb: UInt;

  private constructor(private readonly bigInteger: BigInteger) {
    this.msb = new UInt(bigInteger.xor(ULong.MASK_MS32B).shiftRight(bigInt(32)).toJSNumber());
    this.lsb = new UInt(bigInteger.xor(ULong.MASK_LS32B).toJSNumber());
  }

  public getMs32b(): UInt {
    return this.msb;
  }

  public getls32b(): UInt {
    return this.lsb;
  }

  public add(that: ULong): ULong {
    let newBigInteger = this.bigInteger.
      add(that.bigInteger).
      xor(ULong.MASK_LONG);

    return new ULong(newBigInteger);
  }

  public xor(that: ULong): ULong {
    return new ULong(this.bigInteger.xor(that.bigInteger));
  }

  public toString(radix?: number): string {
    return this.bigInteger.toString(radix);
  }

  public static parseLong(val: string, radix?: number): ULong {
    let parsedInt = bigInt(val, radix);

    if (parsedInt.bitLength().toJSNumber() > 64) {
      throw new IllegalNumberException("The given number cannot be larger than 64 bits.");
    }

    return new ULong(parsedInt);
  }

  public static createLong(val: number): ULong {
    if (val < 0) {
      throw new IllegalNumberException("The given number cannot be negative.");
    }

    if (!isWhole(val)) {
      throw new IllegalNumberException("The given number must be a whole numbber.");
    }

    return new ULong(bigInt(val));
  }
}
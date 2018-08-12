import {IllegalNumberException} from './illegalnumber';
import {isWhole} from './numberutils';
import {UInt} from './uint';
import bigInt = require('big-integer');
import {BigInteger} from 'big-integer';

export class ULong {
  public static MASK_LONG = bigInt('ffffffffffffffff', 16);
  public static MASK_MS32B = bigInt('ffffffff00000000', 16);
  public static MASK_LS32B = bigInt('00000000ffffffff', 16);

  private readonly msb: UInt;
  private readonly lsb: UInt;

  private constructor(private readonly bigInteger: BigInteger) {
    this.msb = new UInt(bigInteger.and(ULong.MASK_MS32B).divide(bigInt(2).pow(32)).toJSNumber());
    this.lsb = new UInt(bigInteger.and(ULong.MASK_LS32B).toJSNumber());
  }

  public getMs32b(): UInt {
    return this.msb;
  }

  public getLs32b(): UInt {
    return this.lsb;
  }

  public add(that: ULong): ULong {
    let newBigInteger = this.bigInteger.
      add(that.bigInteger).
      and(ULong.MASK_LONG);

    return new ULong(newBigInteger);
  }

  public xor(that: ULong): ULong {
    return new ULong(this.bigInteger.xor(that.bigInteger));
  }

  public toBigInt(): BigInteger {
    return this.bigInteger;
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
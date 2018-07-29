export class IllegalNumberException implements Error {
  readonly name = "IllegalNumberException";

  constructor(public message: string = null) {}
}
export class ChargePoint {
  constructor(
    public id: string,
    public identity: string,
    public cpo: string,
  ) {}

  static create(identity: string, cpo: string): ChargePoint {
    return new ChargePoint(crypto.randomUUID(), identity, cpo);
  }

  update(data: { identity?: string }) {
    if (data.identity) {
      this.identity = data.identity;
    }
  }
}

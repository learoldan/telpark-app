export class Organization {
  constructor(
    public id: string,
    public name: string,
    public legalEntity: string,
  ) {}

  static create(name: string, legalEntity: string): Organization {
    return new Organization(crypto.randomUUID(), name, legalEntity);
  }

  update(data: { name?: string; legalEntity?: string }) {
    if (data.name) {
      this.name = data.name;
    }
    if (data.legalEntity) {
      this.legalEntity = data.legalEntity;
    }
  }
}

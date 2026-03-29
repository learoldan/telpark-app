import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Organization } from '../domain/organization';

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  legalEntity: string;

  static fromDomain(organization: Organization): OrganizationEntity {
    const entity = new OrganizationEntity();
    entity.id = organization.id;
    entity.name = organization.name;
    entity.legalEntity = organization.legalEntity;
    return entity;
  }

  toDomain(): Organization {
    return new Organization(this.id, this.name, this.legalEntity);
  }
}

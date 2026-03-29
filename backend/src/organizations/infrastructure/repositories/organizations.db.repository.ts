import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../../domain/organization';
import { OrganizationRepository } from '../../domain/organization.repository';
import { OrganizationEntity } from '../organization.entity';

@Injectable()
export class OrganizationDbRepository implements OrganizationRepository {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly repo: Repository<OrganizationEntity>,
  ) {}

  async findById(id: string): Promise<Organization | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? entity.toDomain() : null;
  }

  async findByName(name: string): Promise<Organization | null> {
    const entity = await this.repo.findOneBy({ name });
    return entity ? entity.toDomain() : null;
  }

  async findAll(): Promise<Organization[]> {
    const entities = await this.repo.find();
    return entities.map((e) => e.toDomain());
  }

  async create(organization: Organization): Promise<Organization> {
    const entity = OrganizationEntity.fromDomain(organization);
    const saved = await this.repo.save(entity);
    return saved.toDomain();
  }

  async update(organization: Organization): Promise<Organization> {
    const entity = OrganizationEntity.fromDomain(organization);
    const saved = await this.repo.save(entity);
    return saved.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

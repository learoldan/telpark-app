import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Organization } from '../domain/organization';
import type { OrganizationRepository } from '../domain/organization.repository';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('OrganizationRepository')
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async findById(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }
    return organization;
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async create(organization: Organization): Promise<Organization> {
    const existing = await this.organizationRepository.findByName(
      organization.name,
    );
    if (existing) {
      throw new ConflictException(
        `Ya existe una organización con el nombre "${organization.name}"`,
      );
    }
    return this.organizationRepository.create(organization);
  }

  async update(organization: Organization): Promise<Organization> {
    return this.organizationRepository.update(organization);
  }

  async delete(id: string): Promise<void> {
    return this.organizationRepository.delete(id);
  }
}

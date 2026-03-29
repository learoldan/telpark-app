import { Organization } from './organization';

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>;
  findAll(): Promise<Organization[]>;
  create(organization: Organization): Promise<Organization>;
  update(organization: Organization): Promise<Organization>;
  delete(id: string): Promise<void>;
}

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Organization } from '../../domain/organization';

export class OrganizationCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  legalEntity: string;

  toDomain(): Organization {
    return Organization.create(this.name, this.legalEntity);
  }
}

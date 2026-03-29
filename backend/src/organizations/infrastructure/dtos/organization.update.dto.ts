import { IsString, IsOptional } from 'class-validator';

export class OrganizationUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  legalEntity?: string;
}

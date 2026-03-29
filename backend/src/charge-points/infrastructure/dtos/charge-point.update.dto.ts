import { IsString, IsOptional } from 'class-validator';

export class ChargePointUpdateDto {
  @IsString()
  @IsOptional()
  identity?: string;
}

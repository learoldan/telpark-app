import { IsString, IsNotEmpty } from 'class-validator';
import { ChargePoint } from 'src/charge-points/domain/charge-point';

export class ChargePointCreateDto {
  @IsString()
  @IsNotEmpty()
  identity: string;

  @IsString()
  @IsNotEmpty()
  cpo: string;

  toDomain(): ChargePoint {
    return ChargePoint.create(this.identity, this.cpo);
  }
}

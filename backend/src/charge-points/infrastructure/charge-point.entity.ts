import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ChargePoint } from '../domain/charge-point';

@Entity('charge_points')
export class ChargePointEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  identity: string;

  @Column()
  cpo: string;

  static fromDomain(chargePoint: ChargePoint): ChargePointEntity {
    const entity = new ChargePointEntity();
    entity.id = chargePoint.id;
    entity.identity = chargePoint.identity;
    entity.cpo = chargePoint.cpo;
    return entity;
  }

  toDomain(): ChargePoint {
    return new ChargePoint(this.id, this.identity, this.cpo);
  }
}

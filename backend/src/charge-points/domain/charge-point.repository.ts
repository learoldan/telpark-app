import { ChargePoint } from './charge-point';

export interface ChargePointRepository {
  findById(id: string): Promise<ChargePoint | null>;
  findByIdentity(identity: string): Promise<ChargePoint | null>;
  findAll(): Promise<ChargePoint[]>;
  create(chargePoint: ChargePoint): Promise<ChargePoint>;
  update(chargePoint: ChargePoint): Promise<ChargePoint>;
  delete(id: string): Promise<void>;
  findByCpo(cpo: string): Promise<ChargePoint[]>;
}

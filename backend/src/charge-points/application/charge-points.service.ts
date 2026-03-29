import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChargePoint } from '../domain/charge-point';
import type { ChargePointRepository } from '../domain/charge-point.repository';

@Injectable()
export class ChargePointsService {
  constructor(
    @Inject('ChargePointRepository')
    private readonly chargePointRepository: ChargePointRepository,
  ) {}

  async findById(id: string): Promise<ChargePoint> {
    const chargePoint = await this.chargePointRepository.findById(id);
    if (!chargePoint) {
      throw new NotFoundException(`ChargePoint with id ${id} not found`);
    }
    return chargePoint;
  }

  async findAll(): Promise<ChargePoint[]> {
    return this.chargePointRepository.findAll();
  }

  async create(chargePoint: ChargePoint): Promise<ChargePoint> {
    const existing = await this.chargePointRepository.findByIdentity(
      chargePoint.identity,
    );
    if (existing) {
      throw new ConflictException(
        `Ya existe un punto de carga con la identidad "${chargePoint.identity}"`,
      );
    }
    return this.chargePointRepository.create(chargePoint);
  }

  async update(chargePoint: ChargePoint): Promise<ChargePoint> {
    return this.chargePointRepository.update(chargePoint);
  }

  async delete(id: string): Promise<void> {
    return this.chargePointRepository.delete(id);
  }

  async findByCpo(cpo: string): Promise<ChargePoint[]> {
    return this.chargePointRepository.findByCpo(cpo);
  }
}

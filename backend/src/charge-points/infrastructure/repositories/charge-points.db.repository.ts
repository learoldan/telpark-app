import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChargePoint } from 'src/charge-points/domain/charge-point';
import { ChargePointRepository } from 'src/charge-points/domain/charge-point.repository';
import { ChargePointEntity } from '../charge-point.entity';

@Injectable()
export class ChargePointDbRepository implements ChargePointRepository {
  constructor(
    @InjectRepository(ChargePointEntity)
    private readonly repo: Repository<ChargePointEntity>,
  ) {}

  async findById(id: string): Promise<ChargePoint | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? entity.toDomain() : null;
  }

  async findByIdentity(identity: string): Promise<ChargePoint | null> {
    const entity = await this.repo.findOneBy({ identity });
    return entity ? entity.toDomain() : null;
  }

  async findAll(): Promise<ChargePoint[]> {
    const entities = await this.repo.find();
    return entities.map((e) => e.toDomain());
  }

  async create(chargePoint: ChargePoint): Promise<ChargePoint> {
    const entity = ChargePointEntity.fromDomain(chargePoint);
    const saved = await this.repo.save(entity);
    return saved.toDomain();
  }

  async update(chargePoint: ChargePoint): Promise<ChargePoint> {
    const entity = ChargePointEntity.fromDomain(chargePoint);
    const saved = await this.repo.save(entity);
    return saved.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findByCpo(cpo: string): Promise<ChargePoint[]> {
    const entities = await this.repo.findBy({ cpo });
    return entities.map((e) => e.toDomain());
  }
}

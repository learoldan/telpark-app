import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargePointsService } from './application/charge-points.service';
import { ChargePointsController } from './infrastructure/controllers/charge-points.controller';
import { ChargePointDbRepository } from './infrastructure/repositories/charge-points.db.repository';
import { ChargePointEntity } from './infrastructure/charge-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChargePointEntity])],
  controllers: [ChargePointsController],
  providers: [
    ChargePointsService,
    {
      provide: 'ChargePointRepository',
      useClass: ChargePointDbRepository,
    },
  ],
  exports: [ChargePointsService],
})
export class ChargePointsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsService } from './application/organizations.service';
import { OrganizationsController } from './infrastructure/controllers/organizations.controller';
import { OrganizationDbRepository } from './infrastructure/repositories/organizations.db.repository';
import { OrganizationEntity } from './infrastructure/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  controllers: [OrganizationsController],
  providers: [
    OrganizationsService,
    {
      provide: 'OrganizationRepository',
      useClass: OrganizationDbRepository,
    },
  ],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}

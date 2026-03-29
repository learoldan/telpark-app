import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { ChargePointsService } from 'src/charge-points/application/charge-points.service';
import { ChargePointCreateDto } from '../dtos/charge-point.create.dto';
import { ChargePointUpdateDto } from '../dtos/charge-point.update.dto';

@Controller('charge-points')
export class ChargePointsController {
  constructor(private readonly chargePointsService: ChargePointsService) {}

  @Get()
  async findAll() {
    return this.chargePointsService.findAll();
  }

  @Get('cpo/:cpo')
  async findByCpo(@Param('cpo') cpo: string) {
    return this.chargePointsService.findByCpo(cpo);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.chargePointsService.findById(id);
  }

  @Post()
  async create(@Body() dto: ChargePointCreateDto) {
    return this.chargePointsService.create(dto.toDomain());
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ChargePointUpdateDto) {
    const chargePoint = await this.chargePointsService.findById(id);
    chargePoint.update(dto);
    return this.chargePointsService.update(chargePoint);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.chargePointsService.delete(id);
  }
}

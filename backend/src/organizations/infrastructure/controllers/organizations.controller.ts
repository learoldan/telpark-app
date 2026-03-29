import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { OrganizationsService } from 'src/organizations/application/organizations.service';
import { OrganizationCreateDto } from '../dtos/organization.create.dto';
import { OrganizationUpdateDto } from '../dtos/organization.update.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.organizationsService.findById(id);
  }

  @Post()
  async create(@Body() dto: OrganizationCreateDto) {
    return this.organizationsService.create(dto.toDomain());
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: OrganizationUpdateDto) {
    const organization = await this.organizationsService.findById(id);
    organization.update(dto);
    return this.organizationsService.update(organization);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.organizationsService.delete(id);
  }
}

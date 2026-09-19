import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { AdmissionsService, AdmissionDossier } from './admissions.service';

@Controller('api/admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Get()
  getAll(@Query('status') status?: string): AdmissionDossier[] {
    return this.admissionsService.findAll(status);
  }

  @Get(':trackingNumber')
  getByTracking(@Param('trackingNumber') trackingNumber: string): AdmissionDossier {
    return this.admissionsService.findByTracking(trackingNumber);
  }

  @Post()
  create(@Body() payload: any): AdmissionDossier {
    return this.admissionsService.create(payload);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: AdmissionDossier['status'],
  ): AdmissionDossier {
    return this.admissionsService.updateStatus(id, status);
  }
}

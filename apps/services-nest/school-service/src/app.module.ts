import { Module } from '@nestjs/common';
import { AdmissionsModule } from './admissions/admissions.module';

@Module({
  imports: [AdmissionsModule],
})
export class AppModule {}

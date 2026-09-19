import { Module } from '@nestjs/common';
import { AdmissionsModule } from './admissions/admissions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    NotificationsModule,
    UsersModule,
    AuthModule,
    AdmissionsModule,
  ],
})
export class AppModule {}

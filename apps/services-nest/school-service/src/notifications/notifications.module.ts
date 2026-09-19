import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { NotificationsController } from './notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [MailService],
  exports: [MailService],
})
export class NotificationsModule {}

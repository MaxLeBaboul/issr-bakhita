import { Controller, Get } from '@nestjs/common';
import { MailService, EmailLogEntry } from './mail.service';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly mailService: MailService) {}

  @Get('logs')
  getEmailLogs(): EmailLogEntry[] {
    return this.mailService.getLogs();
  }
}

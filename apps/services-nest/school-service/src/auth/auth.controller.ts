import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @Get('verify-token')
  async verifyToken(@Query('token') token: string) {
    return this.authService.verifyToken(token);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    return this.authService.resetPassword(body.token, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string; expectedRole?: string }) {
    return this.authService.login(body.email, body.password, body.expectedRole);
  }
}

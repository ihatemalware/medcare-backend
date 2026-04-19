import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('verify-otp')
  @HttpCode(200)
  verifyOtp(@Body() body: { phone: string; otp: string }) {
    console.log('FE gọi verify-otp với body:', body);
    return this.authService.verifyOtp(body.phone, body.otp);
  }
}


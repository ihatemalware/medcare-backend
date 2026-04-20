import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('verify-otp')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify OTP and issue JWT access token' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiOkResponse({
    description: 'JWT access token and user profile',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'cmo5b7yk30000kxa733zwaajo',
          full_name: 'Nguyễn Văn A',
          phone: '0828349488',
        },
      },
    },
  })
  verifyOtp(@Body() body: VerifyOtpDto) {
    console.log('FE gọi verify-otp với body:', body);
    return this.authService.verifyOtp(body.phone, body.otp);
  }
}

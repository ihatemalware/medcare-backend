import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async verifyOtp(phone: string, otp: string) {
    // TODO: validate OTP thật sau — hiện chấp nhận mọi OTP
    try {
      let user = await this.prisma.user.findUnique({ where: { phone } });
      if (!user) {
        user = await this.prisma.user.create({
          data: { phone, full_name: 'Người dùng mới' },
        });
      }

      const token = this.jwtService.sign({
        sub: user.id,
        phone: user.phone,
      });

      // FE sẽ dùng access_token
      return {
        access_token: token,
        user: {
          id: user.id,
          full_name: user.full_name,
          phone: user.phone,
        },
      };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}

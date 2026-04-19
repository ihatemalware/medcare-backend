import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    const secret = 'healthapp-dev-secret';
    console.log('JwtStrategy constructor, SECRET =', secret);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: string; phone?: string }) {
    console.log('JWT PAYLOAD:', payload);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      console.log('JWT USER NOT FOUND FOR SUB:', payload.sub);
      throw new UnauthorizedException();
    }

    console.log('JWT USER FOUND:', user.id);
    return user;
  }
}

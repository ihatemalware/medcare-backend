import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ example: '0828349488' })
  phone: string;

  @ApiProperty({ example: '123456' })
  otp: string;
}

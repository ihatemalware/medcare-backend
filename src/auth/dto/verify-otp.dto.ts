import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: '0828349488' })
  @IsString()
  @Matches(/^\d{9,11}$/, {
    message: 'phone must be a valid Vietnamese phone number',
  })
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(4, 6)
  otp: string;
}


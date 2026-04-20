import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateQuantityDto {
  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(0)
  quantity: number;
}


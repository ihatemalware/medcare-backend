import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsISO8601,
} from 'class-validator';

export class CreateMedicineDto {
  @ApiProperty({ example: 'Paracetamol 500mg' })
  @IsString()
  name: string;

  @ApiProperty({ example: '500mg', required: false })
  @IsOptional()
  @IsString()
  dosage?: string;

  @ApiProperty({ example: 10, required: false, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @ApiProperty({
    example: '1234567890123',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  barcode?: string | null;

  @ApiProperty({
    example: '2026-12-31',
    required: false,
    nullable: true,
    description: 'Expiry date in YYYY-MM-DD format',
  })
  @IsOptional()
  @IsISO8601({}, { message: 'expiry_date must be a valid date (YYYY-MM-DD)' })
  expiry_date?: string | null;

  @ApiProperty({
    example: 'Paracetamol',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  generic_name?: string | null;

  @ApiProperty({
    example: 'viên',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  unit?: string | null;

  @ApiProperty({
    example: 'Giảm đau',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  category?: string | null;

  @ApiProperty({
    example: 'ABC Pharma',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  manufacturer?: string | null;

  @ApiProperty({
    example: 'Ngăn 1',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  location?: string | null;

  @ApiProperty({
    example: 'Uống sau ăn',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  notes?: string | null;
}


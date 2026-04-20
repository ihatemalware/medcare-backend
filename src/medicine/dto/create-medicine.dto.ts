import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineDto {
  @ApiProperty({ example: 'Paracetamol 500mg' })
  name: string;

  @ApiProperty({ example: '500mg', required: false })
  dosage?: string;

  @ApiProperty({ example: 10, required: false, default: 0 })
  quantity?: number;

  @ApiProperty({
    example: '1234567890123',
    required: false,
    nullable: true,
  })
  barcode?: string | null;

  @ApiProperty({
    example: '2026-12-31',
    required: false,
    nullable: true,
    description: 'Expiry date in YYYY-MM-DD format',
  })
  expiry_date?: string | null;

  @ApiProperty({
    example: 'Paracetamol',
    required: false,
    nullable: true,
  })
  generic_name?: string | null;

  @ApiProperty({
    example: 'viên',
    required: false,
    nullable: true,
  })
  unit?: string | null;

  @ApiProperty({
    example: 'Giảm đau',
    required: false,
    nullable: true,
  })
  category?: string | null;

  @ApiProperty({
    example: 'ABC Pharma',
    required: false,
    nullable: true,
  })
  manufacturer?: string | null;

  @ApiProperty({
    example: 'Ngăn 1',
    required: false,
    nullable: true,
  })
  location?: string | null;

  @ApiProperty({
    example: 'Uống sau ăn',
    required: false,
    nullable: true,
  })
  notes?: string | null;
}

import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@ApiTags('Medicines')
@ApiBearerAuth()
@Controller('api/medicines')
@UseGuards(JwtAuthGuard)
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  @ApiOperation({ summary: 'List all medicines of current user' })
  @ApiOkResponse({
    description: 'Array of medicines',
    schema: {
      example: [
        {
          id: 'xxx',
          name: 'Paracetamol 500mg',
          generic_name: 'Paracetamol',
          dosage: '500mg',
          quantity: 10,
          unit: 'viên',
          expiry_date: '2026-12-31',
          category: 'Giảm đau',
          barcode: '1234567890123',
          manufacturer: 'ABC Pharma',
          location: 'Ngăn 1',
          notes: 'Uống sau ăn',
        },
      ],
    },
  })
  async findAll(@Request() req) {
    return this.medicineService.findAll(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new medicine' })
  @ApiBody({ type: CreateMedicineDto })
  @ApiOkResponse({
    description: 'Created medicine',
  })
  async create(@Request() req, @Body() body: CreateMedicineDto) {
    return this.medicineService.create(req.user.id, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing medicine' })
  @ApiBody({ type: CreateMedicineDto })
  @ApiOkResponse({
    description: 'Updated medicine',
  })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: CreateMedicineDto,
  ) {
    return this.medicineService.update(req.user.id, id, body);
  }

  @Patch(':id/quantity')
  @ApiOperation({ summary: 'Update medicine quantity only' })
  @ApiBody({ type: UpdateQuantityDto })
  @ApiOkResponse({
    description: 'Updated quantity',
    schema: {
      example: {
        status: 'success',
        data: {
          id: 'xxx',
          quantity: 5,
        },
      },
    },
  })
  async updateQuantity(
    @Request() req,
    @Param('id') id: string,
    @Body() body: UpdateQuantityDto,
  ) {
    return this.medicineService.updateQuantity(
      req.user.id,
      id,
      Number(body.quantity) || 0,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medicine' })
  @ApiOkResponse({
    description: 'Delete result',
    schema: {
      example: {
        status: 'success',
      },
    },
  })
  async remove(@Request() req, @Param('id') id: string) {
    return this.medicineService.remove(req.user.id, id);
  }
}

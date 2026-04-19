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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MedicineService } from './medicine.service';

@Controller('api/medicines')
@UseGuards(JwtAuthGuard)
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  async findAll(@Request() req) {
    // FE expect array trực tiếp
    return this.medicineService.findAll(req.user.id);
  }

  @Post()
  async create(@Request() req, @Body() body: any) {
    return this.medicineService.create(req.user.id, body);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.medicineService.update(req.user.id, id, body);
  }

  @Patch(':id/quantity')
  async updateQuantity(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { quantity: number },
  ) {
    return this.medicineService.updateQuantity(
      req.user.id,
      id,
      Number(body.quantity) || 0,
    );
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.medicineService.remove(req.user.id, id);
  }
}

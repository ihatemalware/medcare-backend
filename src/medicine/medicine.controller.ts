import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MedicineService } from './medicine.service';

@Controller('api/medicines')
@UseGuards(JwtAuthGuard)
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Get()
  findAll(@Request() req) {
    return this.medicineService.findAll(req.user.id);
  }

  @Post()
  create(@Request() req, @Body() body: any) {
    return this.medicineService.create(req.user.id, body);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() body: any) {
    return this.medicineService.update(req.user.id, id, body);
  }

  @Patch(':id/quantity')
  updateQuantity(@Request() req, @Param('id') id: string, @Body('quantity') quantity: number) {
    return this.medicineService.updateQuantity(req.user.id, id, quantity);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.medicineService.remove(req.user.id, id);
  }
}

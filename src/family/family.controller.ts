import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FamilyService } from './family.service';

@Controller('api/family/members')
@UseGuards(JwtAuthGuard)
export class FamilyController {
  constructor(private familyService: FamilyService) {}

  @Get()
  async findAll(@Request() req) {
    // FE: const raw = Array.isArray(res.data) ? res.data : (res.data?.data || []);
    // → trả array trực tiếp
    return this.familyService.findAll(req.user.id);
  }

  @Post()
  async create(@Request() req, @Body() body: any) {
    // FE: const raw = res.data?.data || res.data;
    return this.familyService.createMember(req.user.id, body);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.familyService.updateMember(req.user.id, id, body);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.familyService.removeMember(req.user.id, id);
  }
}

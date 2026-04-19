import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReminderService } from './reminder.service';

@Controller('api/reminders')
@UseGuards(JwtAuthGuard)
export class ReminderController {
  constructor(private reminderService: ReminderService) {}

  @Get()
  getAll(@Request() req) {
    return this.reminderService.getAll(req.user.id);
  }

  @Post()
  create(@Request() req, @Body() body) {
    return this.reminderService.create(req.user.id, body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.reminderService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reminderService.delete(id);
  }
}

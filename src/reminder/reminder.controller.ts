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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReminderService } from './reminder.service';

@ApiTags('Reminders')
@ApiBearerAuth()
@Controller('api/reminders')
@UseGuards(JwtAuthGuard)
export class ReminderController {
  constructor(private reminderService: ReminderService) {}

  @Get()
  @ApiOperation({ summary: 'List all reminders of current user' })
  @ApiOkResponse({
    description: 'Array of reminders',
    schema: {
      example: {
        status: 'success',
        data: [
          {
            id: 'rem-1',
            title: 'Uống thuốc huyết áp',
            time: '08:00',
            repeat: 'daily',
            note: 'Sau ăn sáng',
            is_active: true,
            created_at: '2026-04-19T10:00:00.000Z',
            user_id: 'cmo5b7yk30000kxa733zwaajo',
          },
        ],
      },
    },
  })
  getAll(@Request() req) {
    return this.reminderService.getAll(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new reminder' })
  @ApiBody({
    schema: {
      example: {
        title: 'Uống thuốc huyết áp',
        time: '08:00',
        repeat: 'daily',
        note: 'Sau ăn sáng',
      },
    },
  })
  @ApiOkResponse({
    description: 'Created reminder',
  })
  create(@Request() req, @Body() body: any) {
    return this.reminderService.create(req.user.id, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a reminder' })
  @ApiBody({
    schema: {
      example: {
        title: 'Uống thuốc huyết áp',
        time: '09:00',
        repeat: 'daily',
        note: 'Sau ăn sáng',
        is_active: true,
      },
    },
  })
  @ApiOkResponse({
    description: 'Updated reminder',
  })
  update(@Param('id') id: string, @Body() body: any) {
    return this.reminderService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reminder' })
  @ApiOkResponse({
    description: 'Delete result',
    schema: {
      example: {
        status: 'success',
      },
    },
  })
  delete(@Param('id') id: string) {
    return this.reminderService.delete(id);
  }
}

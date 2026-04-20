import {
  Controller,
  Get,
  Put,
  Body,
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
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({
    description: 'User profile',
    schema: {
      example: {
        status: 'success',
        data: {
          id: 'cmo5b7yk30000kxa733zwaajo',
          phone: '0828349488',
          full_name: 'Nguyễn Văn A',
          dob: '1990-01-01T00:00:00.000Z',
          created_at: '2026-04-19T10:00:00.000Z',
        },
      },
    },
  })
  getProfile(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBody({
    schema: {
      example: {
        full_name: 'Nguyễn Văn A',
        dob: '1990-01-01',
      },
    },
  })
  @ApiOkResponse({
    description: 'Updated user profile',
  })
  updateProfile(@Request() req, @Body() body: any) {
    return this.userService.updateProfile(req.user.id, body);
  }

  @Get('emergency-card')
  @ApiOperation({ summary: 'Get emergency card for current user' })
  @ApiOkResponse({
    description: 'Emergency card + user name/dob',
    schema: {
      example: {
        status: 'success',
        data: {
          full_name: 'Nguyễn Văn A',
          dob: '1990-01-01T00:00:00.000Z',
          id: 'card-1',
          qr_code: 'qr-cmo5b7yk30000kxa733zwaajo',
          blood_type: 'O+',
          allergies: ['Penicillin'],
          medical_history: ['Tăng huyết áp'],
          current_medicines: ['Amlodipine'],
          user_id: 'cmo5b7yk30000kxa733zwaajo',
          emergency_contacts: [
            {
              id: 'contact-1',
              name: 'Nguyễn Thị B',
              phone: '0912345678',
              relation: 'Mẹ',
              emergency_card_id: 'card-1',
            },
          ],
        },
      },
    },
  })
  getEmergencyCard(@Request() req) {
    return this.userService.getEmergencyCard(req.user.id);
  }

  @Put('emergency-card')
  @ApiOperation({ summary: 'Update emergency card for current user' })
  @ApiBody({
    schema: {
      example: {
        blood_type: 'O+',
        allergies: ['Penicillin'],
        medical_history: ['Tăng huyết áp'],
        current_medicines: ['Amlodipine'],
        emergency_contacts: [
          {
            name: 'Nguyễn Thị B',
            phone: '0912345678',
            relation: 'Mẹ',
          },
        ],
      },
    },
  })
  @ApiOkResponse({
    description: 'Updated emergency card',
  })
  updateEmergencyCard(@Request() req, @Body() body: any) {
    return this.userService.updateEmergencyCard(req.user.id, body);
  }
}

import { Controller, Get, Put, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Put('profile')
  updateProfile(@Request() req, @Body() body: any) {
    return this.userService.updateProfile(req.user.id, body);
  }

  @Get('emergency-card')
  getEmergencyCard(@Request() req) {
    return this.userService.getEmergencyCard(req.user.id);
  }

  @Put('emergency-card')
  updateEmergencyCard(@Request() req, @Body() body: any) {
    return this.userService.updateEmergencyCard(req.user.id, body);
  }
}

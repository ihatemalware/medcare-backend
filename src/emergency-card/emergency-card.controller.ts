import { Controller, Get, Param } from '@nestjs/common';
import { EmergencyCardService } from './emergency-card.service';

@Controller('api/emergency-card')
export class EmergencyCardController {
  constructor(private emergencyCardService: EmergencyCardService) {}

  @Get(':qrCode')
  getCard(@Param('qrCode') qrCode: string) {
    console.log('FE quét QR:', qrCode);
    return this.emergencyCardService.getCard(qrCode);
  }
}


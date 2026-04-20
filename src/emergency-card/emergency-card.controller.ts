import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { EmergencyCardService } from './emergency-card.service';

@ApiTags('Emergency Card')
@Controller('api/emergency-card')
export class EmergencyCardController {
  constructor(private emergencyCardService: EmergencyCardService) {}

  @Get(':qrCode')
  @ApiOperation({ summary: 'Get emergency card data by QR code' })
  @ApiOkResponse({
    description: 'Emergency card data',
    schema: {
      example: {
        status: 'success',
        data: {
          full_name: 'Nguyễn Văn A',
          blood_type: 'O+',
          allergies: ['Penicillin'],
          medical_history: ['Tăng huyết áp'],
          current_medicines: ['Amlodipine'],
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
  @ApiNotFoundResponse({
    description: 'Card not found',
  })
  getCard(@Param('qrCode') qrCode: string) {
    console.log('FE quét QR:', qrCode);
    return this.emergencyCardService.getCard(qrCode);
  }
}

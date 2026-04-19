import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmergencyCardService {
  constructor(private prisma: PrismaService) {}

  async getCard(qrCode: string) {
    const card = await this.prisma.emergencyCard.findUnique({
      where: { qr_code: qrCode },
      include: { user: true, emergency_contacts: true },
    });

    if (!card) {
      return { status: 'error', message: 'Không tìm thấy thẻ' };
    }

    return {
      status: 'success',
      data: {
        full_name: card.user.full_name,
        blood_type: card.blood_type,
        allergies: card.allergies,
        medical_history: card.medical_history,
        current_medicines: card.current_medicines,
        emergency_contacts: card.emergency_contacts,
      },
    };
  }
}
 {}

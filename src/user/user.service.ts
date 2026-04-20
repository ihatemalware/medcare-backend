import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function parseVietnameseDate(input: string): Date | null {
  if (!input) return null;

  const m = input.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (!m) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      // YYYY-MM-DD → parse as UTC để tránh timezone shift
      const [y, mo, d] = input.split('-').map(Number);
      return new Date(Date.UTC(y, mo - 1, d));
    }
    return null;
  }
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);

  return new Date(Date.UTC(year, month - 1, day));
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ---------- PROFILE ----------

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        full_name: true,
        date_of_birth: true,
        created_at: true,
      },
    });

    if (!user) {
      return {
        status: 'error',
        data: null,
      };
    }

    // Trả dob dạng YYYY-MM-DD để FE format thành DD/MM/YYYY
    const dobString = user.date_of_birth
      ? user.date_of_birth.toISOString().slice(0, 10)
      : null;

    return {
      status: 'success',
      data: {
        id: user.id,
        phone: user.phone,
        full_name: user.full_name,
        dob: dobString,
        created_at: user.created_at,
      },
    };
  }

  async updateProfile(userId: string, data: any) {
    const updateData: any = {};

    // full_name: hỗ trợ full_name và fullName
    if (data.full_name !== undefined) {
      updateData.full_name = data.full_name;
    }
    if (data.fullName !== undefined && updateData.full_name === undefined) {
      updateData.full_name = data.fullName;
    }

    // dob -> date_of_birth (nhận DD/MM/YYYY, DD-MM-YYYY hoặc YYYY-MM-DD)
    if (data.dob !== undefined && data.dob !== null && data.dob !== '') {
      const parsed = parseVietnameseDate(data.dob);
      updateData.date_of_birth = parsed;
    } else if (data.dob === null) {
      updateData.date_of_birth = null;
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        phone: true,
        full_name: true,
        date_of_birth: true,
        created_at: true,
      },
    });

    const dobString = user.date_of_birth
      ? user.date_of_birth.toISOString().slice(0, 10)
      : null;

    return {
      status: 'success',
      data: {
        id: user.id,
        phone: user.phone,
        full_name: user.full_name,
        dob: dobString,
        created_at: user.created_at,
      },
    };
  }

  // ---------- EMERGENCY CARD ----------

  async getEmergencyCard(userId: string) {
    // Lấy thông tin user để có full_name + dob
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        full_name: true,
        date_of_birth: true,
      },
    });

    const card = await this.prisma.emergencyCard.findUnique({
      where: { user_id: userId },
      include: { emergency_contacts: true },
    });

    const dobString = user?.date_of_birth
      ? user.date_of_birth.toISOString().slice(0, 10)
      : null;

    return {
      status: 'success',
      data: {
        full_name: user?.full_name ?? null,
        dob: dobString, // FE đọc dob ở đây (YYYY-MM-DD)

        ...(card ?? {}),
      },
    };
  }

  async updateEmergencyCard(userId: string, data: any) {
    try {
      const { emergency_contacts, ...cardData } = data;

      const normalizeArray = (v: any): string[] => {
        if (!v) return [];
        if (Array.isArray(v)) return v;
        return String(v)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      };

      // 1) Upsert EmergencyCard
      const card = await this.prisma.emergencyCard.upsert({
        where: { user_id: userId },
        update: {
          blood_type: cardData.blood_type,
          allergies: normalizeArray(cardData.allergies),
          medical_history: normalizeArray(cardData.medical_history),
          current_medicines: normalizeArray(cardData.current_medicines),
        },
        create: {
          user_id: userId,
          qr_code: `qr-${userId}`,
          blood_type: cardData.blood_type,
          allergies: normalizeArray(cardData.allergies),
          medical_history: normalizeArray(cardData.medical_history),
          current_medicines: normalizeArray(cardData.current_medicines),
        },
        include: {
          emergency_contacts: true,
        },
      });

      // 2) Cập nhật emergency_contacts nếu FE gửi
      if (Array.isArray(emergency_contacts)) {
        await this.prisma.emergencyContact.deleteMany({
          where: { emergency_card_id: card.id },
        });

        if (emergency_contacts.length > 0) {
          await this.prisma.emergencyContact.createMany({
            data: emergency_contacts.map((c: any) => ({
              emergency_card_id: card.id,
              name: c.name,
              phone: c.phone,
              relation: c.relation,
            })),
          });
        }
      }

      // 3) Load lại card với contacts mới
      const updated = await this.prisma.emergencyCard.findUnique({
        where: { id: card.id },
        include: { emergency_contacts: true },
      });

      return {
        status: 'success',
        data: updated,
      };
    } catch (e) {
      console.error('updateEmergencyCard ERROR:', e);
      throw e;
    }
  }
}

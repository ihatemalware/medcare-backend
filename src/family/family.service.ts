import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FamilyService {
  constructor(private prisma: PrismaService) {}

  // GET /api/family/members
  async findAll(userId: string) {
    const members = await this.prisma.familyMember.findMany({
      where: { user_id: userId },
    });

    // Shape dữ liệu đúng theo FE mapMember: dùng full_name / relationship
    const shaped = members.map((m) => ({
      id: m.id,
      full_name: m.name,
      relationship: m.relation,
      phone: m.phone,
      // Các field còn lại FE sẽ fallback về '' hoặc null
      // date_of_birth, blood_type, ... hiện BE chưa lưu
    }));

    // FE chờ array trực tiếp
    return shaped;
  }

  // POST /api/family/members
  async createMember(userId: string, dto: any) {
    try {
      // Ưu tiên field FE gửi theo toPayload()
      const fullName = dto.full_name ?? dto.fullName ?? '';
      const relationship = dto.relationship ?? dto.relation ?? '';

      const member = await this.prisma.familyMember.create({
        data: {
          user_id: userId,
          name: fullName,
          phone: dto.phone,
          relation: relationship,
        },
      });

      const shaped = {
        id: member.id,
        full_name: member.name,
        relationship: member.relation,
        phone: member.phone,
      };

      return {
        status: 'success',
        data: shaped,
      };
    } catch (e) {
      console.error('createFamilyMember ERROR:', e);
      throw e;
    }
  }

  // PUT /api/family/members/:id
  async updateMember(userId: string, id: string, dto: any) {
    const fullName = dto.full_name ?? dto.fullName ?? '';
    const relationship = dto.relationship ?? dto.relation ?? '';

    const member = await this.prisma.familyMember.update({
      where: { id },
      data: {
        name: fullName,
        phone: dto.phone,
        relation: relationship,
      },
    });

    const shaped = {
      id: member.id,
      full_name: member.name,
      relationship: member.relation,
      phone: member.phone,
    };

    return {
      status: 'success',
      data: shaped,
    };
  }

  // DELETE /api/family/members/:id
  async removeMember(userId: string, id: string) {
    await this.prisma.familyMember.delete({
      where: { id },
    });

    return {
      status: 'success',
    };
  }
}

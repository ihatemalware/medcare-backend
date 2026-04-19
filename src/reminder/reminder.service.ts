import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReminderService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    const data = await this.prisma.reminder.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    return { status: 'success', data };
  }

  async create(userId: string, body: any) {
    const data = await this.prisma.reminder.create({
      data: { ...body, user_id: userId },
    });
    return { status: 'success', data };
  }

  async update(id: string, body: any) {
    const data = await this.prisma.reminder.update({ where: { id }, data: body });
    return { status: 'success', data };
  }

  async delete(id: string) {
    await this.prisma.reminder.delete({ where: { id } });
    return { status: 'success' };
  }
}

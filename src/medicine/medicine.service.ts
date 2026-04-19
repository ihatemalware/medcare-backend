import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const medicines = await this.prisma.medicine.findMany({
      where: { user_id: userId },
    });

    return {
      status: 'success',
      data: medicines,
    };
  }

  async create(userId: string, dto: any) {
    try {
      const medicine = await this.prisma.medicine.create({
        data: {
          user_id: userId,
          name: dto.name,
          barcode: dto.barcode,
          quantity: dto.quantity ?? 0,
          unit: dto.unit,
          note: dto.note,
        },
      });

      return {
        status: 'success',
        data: medicine,
      };
    } catch (e) {
      console.error('createMedicine ERROR:', e);

      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Thuốc với mã barcode này đã tồn tại');
      }

      throw new InternalServerErrorException('Lỗi khi tạo thuốc');
    }
  }

  async update(userId: string, id: string, dto: any) {
    const medicine = await this.prisma.medicine.update({
      where: { id },
      data: {
        name: dto.name,
        barcode: dto.barcode,
        quantity: dto.quantity,
        unit: dto.unit,
        note: dto.note,
      },
    });

    return {
      status: 'success',
      data: medicine,
    };
  }

  async updateQuantity(userId: string, id: string, quantity: number) {
    const medicine = await this.prisma.medicine.update({
      where: { id },
      data: { quantity },
    });

    return {
      status: 'success',
      data: medicine,
    };
  }

  async remove(userId: string, id: string) {
    const medicine = await this.prisma.medicine.delete({
      where: { id },
    });

    return {
      status: 'success',
      data: medicine,
    };
  }
}

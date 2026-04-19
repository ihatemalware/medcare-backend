import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface MedicineDto {
  name: string;
  dosage?: string | null;
  quantity?: number | null;
  barcode?: string | null;
  expiry_date?: string | null;
  generic_name?: string | null;
  unit?: string | null;
  category?: string | null;
  manufacturer?: string | null;
  location?: string | null;
  notes?: string | null;
}

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  // GET /api/medicines
  async findAll(userId: string) {
    const meds = await this.prisma.medicine.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });

    return meds.map((m) => ({
      id: m.id,
      name: m.name,
      generic_name: m.generic_name,
      dosage: m.dosage,
      quantity: m.quantity,
      unit: m.unit,
      expiry_date: m.expiry_date
        ? m.expiry_date.toISOString().slice(0, 10)
        : null,
      category: m.category,
      barcode: m.barcode,
      manufacturer: m.manufacturer,
      location: m.location,
      notes: m.notes,
    }));
  }

  // POST /api/medicines
  async create(userId: string, dto: MedicineDto) {
    try {
      const expiryDate =
        dto.expiry_date && dto.expiry_date.trim() !== ''
          ? new Date(dto.expiry_date)
          : null;

      const med = await this.prisma.medicine.create({
        data: {
          user_id: userId,
          name: dto.name,
          dosage: dto.dosage ?? null,
          quantity: dto.quantity ?? 0,
          barcode: dto.barcode ?? null,
          expiry_date: expiryDate,
          generic_name: dto.generic_name ?? null,
          unit: dto.unit ?? null,
          category: dto.category ?? null,
          manufacturer: dto.manufacturer ?? null,
          location: dto.location ?? null,
          notes: dto.notes ?? null,
        },
      });

      return {
        status: 'success',
        data: {
          id: med.id,
          name: med.name,
          generic_name: med.generic_name,
          dosage: med.dosage,
          quantity: med.quantity,
          unit: med.unit,
          expiry_date: med.expiry_date
            ? med.expiry_date.toISOString().slice(0, 10)
            : null,
          category: med.category,
          barcode: med.barcode,
          manufacturer: med.manufacturer,
          location: med.location,
          notes: med.notes,
        },
      };
    } catch (e) {
      console.error('createMedicine ERROR:', e);
      throw e;
    }
  }

  // PUT /api/medicines/:id
  async update(userId: string, id: string, dto: MedicineDto) {
    const expiryDate =
      dto.expiry_date && dto.expiry_date.trim() !== ''
        ? new Date(dto.expiry_date)
        : null;

    const med = await this.prisma.medicine.update({
      where: { id },
      data: {
        name: dto.name,
        dosage: dto.dosage ?? null,
        quantity: dto.quantity ?? 0,
        barcode: dto.barcode ?? null,
        expiry_date: expiryDate,
        generic_name: dto.generic_name ?? null,
        unit: dto.unit ?? null,
        category: dto.category ?? null,
        manufacturer: dto.manufacturer ?? null,
        location: dto.location ?? null,
        notes: dto.notes ?? null,
      },
    });

    return {
      status: 'success',
      data: {
        id: med.id,
        name: med.name,
        generic_name: med.generic_name,
        dosage: med.dosage,
        quantity: med.quantity,
        unit: med.unit,
        expiry_date: med.expiry_date
          ? med.expiry_date.toISOString().slice(0, 10)
          : null,
        category: med.category,
        barcode: med.barcode,
        manufacturer: med.manufacturer,
        location: med.location,
        notes: med.notes,
      },
    };
  }

  // PATCH /api/medicines/:id/quantity
  async updateQuantity(userId: string, id: string, quantity: number) {
    const med = await this.prisma.medicine.update({
      where: { id },
      data: { quantity },
    });

    return {
      status: 'success',
      data: {
        id: med.id,
        quantity: med.quantity,
      },
    };
  }

  // DELETE /api/medicines/:id
  async remove(userId: string, id: string) {
    await this.prisma.medicine.delete({
      where: { id },
    });

    return {
      status: 'success',
    };
  }
}

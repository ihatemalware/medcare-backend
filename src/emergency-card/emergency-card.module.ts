import { Module } from '@nestjs/common';
import { EmergencyCardController } from './emergency-card.controller';
import { EmergencyCardService } from './emergency-card.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmergencyCardController],
  providers: [EmergencyCardService],
})
export class EmergencyCardModule {}

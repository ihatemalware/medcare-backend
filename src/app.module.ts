import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReminderModule } from './reminder/reminder.module';
import { MedicineModule } from './medicine/medicine.module';
import { FamilyModule } from './family/family.module';
import { EmergencyCardModule } from './emergency-card/emergency-card.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    ReminderModule,
    MedicineModule,
    FamilyModule,
    EmergencyCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

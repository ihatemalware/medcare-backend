import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyCardService } from './emergency-card.service';

describe('EmergencyCardService', () => {
  let service: EmergencyCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyCardService],
    }).compile();

    service = module.get<EmergencyCardService>(EmergencyCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyCardController } from './emergency-card.controller';

describe('EmergencyCardController', () => {
  let controller: EmergencyCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyCardController],
    }).compile();

    controller = module.get<EmergencyCardController>(EmergencyCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

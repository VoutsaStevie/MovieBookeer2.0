import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: Repository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a reservation', async () => {
    const reservation = await service.createReservation(1, 1, new Date());
    expect(reservation).toHaveProperty('id');
  });
});

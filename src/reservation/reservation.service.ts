import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';

import { MoviesService } from '../movies/movies.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService
  ) {}

  async reservation(
    user: any,
    movie: any,
    date: string,
    reservationTime: string
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      user,
      movieId: movie.id,
      date,
      reservationTime,
    });

    return this.reservationRepository.save(reservation);
  }

  async getReservations(userId: number): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'movie'],
    });
  }

  async cancelReservation(id: number): Promise<void> {
    const reservation = await this.reservationRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new BadRequestException('Réservation non trouvée');
    }

    await this.reservationRepository.remove(reservation);
  }
}

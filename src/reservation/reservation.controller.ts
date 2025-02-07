import { Body, Controller, Post, Get, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { MoviesService } from '../movies/movies.service';
import { UsersService } from '../users/users.service';
import { ReservationDto } from './dto/reservation.dto';

@Controller('reservations')
@ApiTags('Reservations')
@ApiBearerAuth('access-token')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly moviesService: MoviesService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer une réservation' })
  @ApiResponse({ status: 201, description: 'Réservation créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur de validation ou date invalide.' })
  async reservation(@Body() reservationDto: ReservationDto): Promise<Reservation> {
    const { userId, movieId, date, reservationTime } = reservationDto;

    const user = await this.usersService.findOne(userId.toString());
    if (!user) {
      throw new BadRequestException('Utilisateur non trouvé');
    }

    const movie = await this.moviesService.getMovieDetails(movieId);
    if (!movie) {
      throw new BadRequestException('Film introuvable.');
    }

    if (new Date(reservationTime) < new Date(movie.release_date)) {
      throw new BadRequestException(`Vous ne pouvez pas réserver avant la sortie du film le ${movie.release_date}.`);
    }

    return await this.reservationService.reservation(user, movie, date, reservationTime);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obtenir les réservations d’un utilisateur' })
  async getReservations(@Param('userId') userId: number): Promise<Reservation[]> {
    return this.reservationService.getReservations(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Annuler une réservation' })
  async cancelReservation(@Param('id') id: number): Promise<void> {
    return this.reservationService.cancelReservation(id);
  }
}

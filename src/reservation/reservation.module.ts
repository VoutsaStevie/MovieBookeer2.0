import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';  // Importer le HttpModule
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { MoviesService } from '../movies/movies.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    HttpModule,
  ],
  providers: [ReservationService, MoviesService, UsersService],
  controllers: [ReservationController],
})
export class ReservationModule {}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString } from 'class-validator';

export class ReservationDto {
  @ApiProperty({ example: 1, description: "ID de l'utilisateur" })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 10, description: 'ID du film' })
  @IsInt()
  movieId: number;

  @ApiProperty({ example: '2024-06-30', description: 'Date de réservation (AAAA-MM-JJ)' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '2024-06-30T18:00:00.000Z', description: 'Heure de réservation (ISO 8601)' })
  @IsString()
  reservationTime: string;
}

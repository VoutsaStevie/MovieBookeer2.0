
import { IsString, IsISO8601, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ example: "2024-02-10T15:30:00Z", description: "Date de réservtion" })
  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: "Salle 1", description: "Nom de la salle réservée" })
  @IsString()
  @IsNotEmpty()
  room: string;
}

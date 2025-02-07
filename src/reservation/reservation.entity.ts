import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @Column()
  movieId: number;

  @Column()
  date: string;

  @Column()
  reservationTime: string;
}

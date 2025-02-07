import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/reservation.entity';
import { User } from './users/user.entity';
//import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'stevie',
            password: 'password',
            database: 'moviedb',
            entities: [User, Reservation],
            synchronize: true, // Désactive en production
          }),
      AuthModule,
      UsersModule,
      MoviesModule,
      ReservationModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
//import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [AuthModule, UsersModule,  MoviesModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}



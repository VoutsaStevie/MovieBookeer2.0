
import { Module } from '@nestjs/common';
import {UsersService} from './users.service';
//import { UserService } from './user.service';
//import { UserController } from './user.controller';
import { UsersController } from './users.controller';


@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}



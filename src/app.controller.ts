import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AppController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard('local'))
 // @Post('auth/login')
    //async login(@Request() req) {
   //   return req.user;
  //  }

  @Post('login')
  login(@Body() body: any) {
    return this.usersService.login(body);
  }
  @Post('register')
    register(@Body() body: any) {
      return this.usersService.register(body);
     // return this.usersService.create(body);

    }
}


import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('auth')
export class UsersController {

  @Post('register')
  register(@Body() body: any) {
    return { message: 'Inscription réussie', data: body };
  }

  @Post('login')
  login(@Body() body: any) {
    return { message: 'Connexion réussie', data: body };
  }
}

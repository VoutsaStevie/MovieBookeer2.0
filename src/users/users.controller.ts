import { RegisterDto } from '../auth/dto/register.dto'
import { LoginDto } from '../auth/dto/login.dto'
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('auth')
export class UsersController {

  @Post('register')
  register(@Body() body: RegisterDto) {
    return { message: 'Inscription réussie', data: body };
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return { message: 'Connexion réussie', data: body };
  }
}

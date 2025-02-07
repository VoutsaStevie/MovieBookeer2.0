import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { LoginDto } from './dto/login.dto';
  import { RegisterDto } from './dto/register.dto';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';

  @Controller('auth')
  @ApiTags('Auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginDto) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() registerDto: RegisterDto) {
      return this.authService.signUp(registerDto);
    }


    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
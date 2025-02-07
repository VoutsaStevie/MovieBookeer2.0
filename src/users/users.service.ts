import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
//import { ConflictException} from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

interface User {
  email: string;
  username: string;
  password: string;
  userId: number;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}


  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }


    async register(registerDto: RegisterDto) {
      const existingUser = this.users.find(user => user.email === registerDto.email);
      if (existingUser) {
        throw new ConflictException('Utilisateur déjà existant');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const newUser = {
        userId: this.users.length + 1,
        username: registerDto.username,
        email: registerDto.email,
        password: hashedPassword,
      };

      this.users.push(newUser);
      return newUser;
    }


  async login(loginDto: LoginDto) {
    const user = this.users.find(user => user.username === loginDto.username);
    if (!user) {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }



    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}

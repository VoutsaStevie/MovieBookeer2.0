import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
//import { RegisterDto, LoginDto } from 'users/dto/register.dto';
//import { RegisterDto, LoginDto } from './dto';
import { RegisterDto, LoginDto } from './dto/register.dto';

interface User {
  username: string;
  password: string;
  userId: number;
}

@Injectable()
export class UsersService {
  private users: User[] = []; // Tableau des utilisateurs

  constructor(private readonly jwtService: JwtService) {}

  // Méthode findOne pour rechercher un utilisateur par son nom d'utilisateur
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async register(registerDto: RegisterDto) {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = this.users.find(user => user.username === registerDto.username);
    if (existingUser) {
      throw new ConflictException('Utilisateur déjà existant');
    }

    // Hache le mot de passe
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crée un nouvel utilisateur
    const newUser: User = {
      username: registerDto.username,
      password: hashedPassword,
      userId: this.users.length + 1, // ID basique pour l'exemple
    };

    // Sauvegarde l'utilisateur
    this.users.push(newUser);

    return { message: 'Utilisateur créé avec succès' };
  }

  async login(loginDto: LoginDto) {
    // Vérifie si l'utilisateur existe
    const user = this.users.find(user => user.username === loginDto.username);
    if (!user) {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }

    // Génère un JWT
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}

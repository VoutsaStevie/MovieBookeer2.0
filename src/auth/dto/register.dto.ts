import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'lol@ste.com', description: 'Adresse email ' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'stevie', description: 'Nom d’utilisateur' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'password123', description: 'Mot de passe' })
    @IsString()
    @MinLength(6)
    password: string;
}

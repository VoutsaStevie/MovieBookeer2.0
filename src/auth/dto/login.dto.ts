import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({ example: 'stevie', description: 'user name' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'ste@lol.com', description: 'user emaik' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Mot de passe' })
  password: string;
}

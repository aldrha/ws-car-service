import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterUserDto {
    @ApiProperty({ description: 'Nombre de usuario', example: 'jdoe' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Correo electrónico', example: 'jdoe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Número de teléfono (formato internacional)', example: '+1234567890' })
    @IsPhoneNumber() // Valida formatos internacionales como +58...
    phone: string;

    @ApiProperty({ description: 'Contraseña (mínimo 6 caracteres)', example: 'password123' })
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}

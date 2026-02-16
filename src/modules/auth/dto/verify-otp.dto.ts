import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'usuario@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Código OTP de 4 dígitos', example: '1234' })
    @IsString()
    @Length(4, 4) // Asumiendo que generamos 4 dígitos
    code: string;
}
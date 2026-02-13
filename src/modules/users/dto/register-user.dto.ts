import { IsBoolean, IsEmail, isNotEmpty, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";


export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber() // Valida formatos internacionales como +58...
    phone: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isVerified: boolean;
}
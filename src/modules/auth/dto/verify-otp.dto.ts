import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(4, 4) // Asumiendo que generamos 4 dígitos
    code: string;
}
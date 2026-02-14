import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from 'src/common/services/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'TU_SEMILLA_SECRETA', // En producción usa variables de entorno
            signOptions: { expiresIn: '7d' }, // El token dura 7 días
        }),
    ],
    controllers: [AuthController],
    providers: [BcryptService, AuthService],
})
export class AuthModule { }

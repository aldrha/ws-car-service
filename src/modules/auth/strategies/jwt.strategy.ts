import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            // Extrae el token del header Authorization: Bearer ...
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'TU_SEMILLA_SECRETA', // Usa la misma que en el AuthModule
        });
    }

    // Este método se ejecuta automáticamente si el token es válido
    async validate(payload: { sub: number; email: string }) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException('Usuario no válido');
        }

        // Lo que retornes aquí se inyectará en el objeto 'req.user'
        return user;
    }
}
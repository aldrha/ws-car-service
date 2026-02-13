import { Injectable } from "@nestjs/common";
import { RegisterFullDto } from "./dto/register-full.dto"
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }
    async registerWithVehicle(dto: RegisterFullDto) {
        // Usamos $transaction para asegurar que ambas cosas se guarden o ninguna
        return await this.prisma.$transaction(async (tx) => {
            // 1. Crear el usuario dentro de la transacción
            const newUser = await tx.user.create({
                data: {
                    ...dto.user,
                    password: dto.user.password, // Recuerda hashear esto más adelante
                },
            });

            // 2. Crear el vehículo vinculado a ese NUEVO usuario
            const newVehicle = await tx.vehicle.create({
                data: {
                    ...dto.vehicle,
                    userId: newUser.id, // Aquí usamos el ID real que acabamos de generar
                },
            });

            // 3. (Opcional) Enviar OTP aquí...

            return { user: newUser, vehicle: newVehicle };
        })
    }
}
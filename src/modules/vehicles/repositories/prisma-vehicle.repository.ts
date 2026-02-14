import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { IVehicleRepository } from './vehicle.repository';

import { Vehicle } from 'src/generated/prisma/client';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

@Injectable()
export class PrismaVehicleRepository implements IVehicleRepository {
    constructor(private readonly prisma: PrismaService) { }

    // src/modules/vehicles/repositories/prisma-vehicle.repository.ts

    async create(data: CreateVehicleDto, userId: number): Promise<Vehicle> {
        return this.prisma.vehicle.create({
            data: {
                make: data.make,
                model: data.model,
                plate: data.plate,
                initialMileage: data.initialMileage,
                // Usamos ?? para asegurar que si viene undefined, se asigne el initialMileage
                currentMileage: data.currentMileage ?? data.initialMileage,
                lastServiceMileage: data.lastServiceMileage ?? data.initialMileage,
                // Aseguramos la fecha
                lastServiceDate: data.lastServiceDate ?? new Date(),
                imageUrl: data.imageUrl ?? null,
                // La relación con el usuario
                userId: userId,
            },
        });
    }

    async findAllByUserId(userId: number): Promise<Vehicle[]> {
        return this.prisma.vehicle.findMany({ where: { userId } });
    }

    async findById(id: number): Promise<Vehicle | null> {
        return this.prisma.vehicle.findUnique({ where: { id } });
    }

    async findByPlate(plate: string): Promise<Vehicle | null> {
        return this.prisma.vehicle.findUnique({ where: { plate } });
    }

    async update(id: number, data: UpdateVehicleDto): Promise<Vehicle> {
        return this.prisma.vehicle.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.vehicle.delete({ where: { id } });
    }
}

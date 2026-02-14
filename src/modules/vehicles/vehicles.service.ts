import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { PrismaVehicleRepository } from './repositories/prisma-vehicle.repository';

import { Vehicle } from 'src/generated/prisma/client';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {

    constructor(private vehicleRepository: PrismaVehicleRepository) { }

    async create(data: CreateVehicleDto, userId: number): Promise<Vehicle> {

        const existingVehicle = await this.vehicleRepository.findByPlate(data.plate);
        if (existingVehicle) {
            throw new ConflictException('Vehicle already exists');
        }
        return this.vehicleRepository.create(data, userId);
    }

    async findAll(userId: number): Promise<Vehicle[]> {
        return this.vehicleRepository.findAllByUserId(userId);
    }

    async findById(id: number, userId: number): Promise<Vehicle | null> {
        const vehicle = await this.vehicleRepository.findById(id);

        if (!vehicle) {
            throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
        }

        // Seguridad: Verificar que el vehículo pertenezca al usuario que lo pide
        if (vehicle.userId !== userId) {
            throw new ForbiddenException('No tienes permiso para ver este vehículo');
        }

        return vehicle;
    }

    async update(id: number, updateVehicleDto: UpdateVehicleDto, userId: number): Promise<Vehicle> {
        //Primero verifico que el vehiculo exista y pertenezca al usuario
        await this.findById(id, userId);
        return this.vehicleRepository.update(id, updateVehicleDto);
    }

    async delete(id: number, userId: number) {
        //Primero verifico que el vehiculo exista y pertenezca al usuario
        await this.findById(id, userId);
        return this.vehicleRepository.delete(id);
    }
}

import { Injectable } from "@nestjs/common";
import { IVehicleRepository } from "./vehicle.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { Vehicle } from "@prisma/client";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";


@Injectable()
export class PrismaVehicleRepository implements IVehicleRepository {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateVehicleDto, userId: number): Promise<Vehicle> {
        return this.prisma.vehicle.create({
            data: {
                ...data,
                userId
            }
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
            data
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.vehicle.delete({ where: { id } });
    }
}
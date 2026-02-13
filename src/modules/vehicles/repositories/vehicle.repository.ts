import { Vehicle } from '@prisma/client';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';


export interface IVehicleRepository {
    create(data: CreateVehicleDto, userId: number): Promise<Vehicle>;
    findAllByUserId(userId: number): Promise<Vehicle[]>;
    findById(id: number): Promise<Vehicle | null>;
    findByPlate(plate: string): Promise<Vehicle | null>;
    update(id: number, data: UpdateVehicleDto): Promise<Vehicle>;
    delete(id: number): Promise<void>;
}
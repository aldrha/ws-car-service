import { Type } from 'class-transformer';
import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    make: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    plate: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    initialMileage: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    currentMileage?: number;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    lastServiceDate: Date;

    @IsNumber()
    @Min(0)
    @IsOptional()
    lastServiceMileage?: number;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}

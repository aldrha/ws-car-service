import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty({ description: 'Marca del vehículo', example: 'Toyota' })
    @IsString()
    @IsNotEmpty()
    make: string;

    @ApiProperty({ description: 'Modelo del vehículo', example: 'Corolla' })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ description: 'Placa del vehículo', example: 'ABC-123' })
    @IsString()
    @IsNotEmpty()
    plate: string;

    @ApiProperty({ description: 'Kilometraje inicial', example: 0 })
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    initialMileage: number;

    @ApiProperty({ description: 'Kilometraje actual', example: 100, required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    currentMileage?: number;

    @ApiProperty({ description: 'Fecha del último servicio', example: '2024-02-16' })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    lastServiceDate: Date;

    @ApiProperty({ description: 'Kilometraje del último servicio', example: 100, required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    lastServiceMileage?: number;

    @ApiProperty({ description: 'URL de la imagen del vehículo', required: false })
    @IsString()
    @IsOptional()
    imageUrl?: string;
}

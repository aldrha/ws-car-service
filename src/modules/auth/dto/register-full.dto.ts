import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { RegisterUserDto } from '../../users/dto/register-user.dto';
import { CreateVehicleDto } from '../../vehicles/dto/create-vehicle.dto';

export class RegisterFullDto {
    @ApiProperty({ type: RegisterUserDto })
    @ValidateNested()
    @Type(() => RegisterUserDto)
    user: RegisterUserDto;

    @ApiProperty({ type: CreateVehicleDto })
    @ValidateNested()
    @Type(() => CreateVehicleDto)
    vehicle: CreateVehicleDto;
}

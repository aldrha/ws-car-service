import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { RegisterUserDto } from "src/modules/users/dto/register-user.dto";
import { CreateVehicleDto } from "src/modules/vehicles/dto/create-vehicle.dto";


export class RegisterFullDto {
    @ValidateNested()
    @Type(() => RegisterUserDto)
    user: RegisterUserDto;

    @ValidateNested()
    @Type(() => CreateVehicleDto)
    vehicle: CreateVehicleDto;
}
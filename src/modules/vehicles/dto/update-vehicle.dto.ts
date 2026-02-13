import { PartialType } from "@nestjs/mapped-types";
import { CreateVehicleDto } from "./create-vehicle.dto";


//Hereda todo de CreateVehicleDto pero con campos opcionales
export class UpdateVehicleDto extends PartialType(CreateVehicleDto) { }
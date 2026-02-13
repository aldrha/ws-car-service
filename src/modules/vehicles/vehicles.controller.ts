import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehiclesService } from './vehicles.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {

    constructor(private readonly vehiclesService: VehiclesService) { }
    // Temporalmente simulamos el usuario ID 1
    private readonly mockUserId = 1;

    @Post()
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.create(createVehicleDto, this.mockUserId);
    }

    @Get()
    async findAll() {
        return await this.vehiclesService.findAll(this.mockUserId);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.vehiclesService.findById(id, this.mockUserId);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number,
        @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.update(id, updateVehicleDto, this.mockUserId);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.vehiclesService.delete(id, this.mockUserId);
    }
}

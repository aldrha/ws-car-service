import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {

    constructor(private readonly vehiclesService: VehiclesService) { }
    // Temporalmente simulamos el usuario ID 1
    private readonly mockUserId = 1;

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo vehículo' })
    @ApiResponse({ status: 201, description: 'El vehículo ha sido creado exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.create(createVehicleDto, this.mockUserId);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los vehículos' })
    @ApiResponse({ status: 200, description: 'Lista de vehículos obtenida.' })
    async findAll() {
        return await this.vehiclesService.findAll(this.mockUserId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un vehículo por ID' })
    @ApiResponse({ status: 200, description: 'Vehículo encontrado.' })
    @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.vehiclesService.findById(id, this.mockUserId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un vehículo' })
    @ApiResponse({ status: 200, description: 'Vehículo actualizado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
    update(@Param('id', ParseIntPipe) id: number,
        @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.update(id, updateVehicleDto, this.mockUserId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un vehículo' })
    @ApiResponse({ status: 200, description: 'Vehículo eliminado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.vehiclesService.delete(id, this.mockUserId);
    }
}

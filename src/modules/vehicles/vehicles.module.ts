import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaVehicleRepository } from './repositories/prisma-vehicle.repository';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [PrismaModule],
  controllers: [VehiclesController],
  providers: [PrismaVehicleRepository, VehiclesService]
})
export class VehiclesModule { }

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeaponsController } from './weapons.controller';
import { WeaponsService } from './weapons.service';

@Module({
  imports: [HttpModule],
  controllers: [WeaponsController],
  providers: [WeaponsService],
})
export class WeaponsModule {}
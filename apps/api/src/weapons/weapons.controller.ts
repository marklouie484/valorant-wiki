import { Controller, Get, Param } from '@nestjs/common';
import { WeaponsService } from './weapons.service';

@Controller('weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get()
  findAll() {
    return this.weaponsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.weaponsService.findOne(uuid);
  }

  // @Get('skins')
  // findAllSkins() {
  //   return this.weaponsService.findAllSkins();
  // }

  // @Get('skins/:uuid')
  // findOneSkin(@Param('uuid') uuid: string) {
  //   return this.weaponsService.findOneSkin(uuid);
  // }
}

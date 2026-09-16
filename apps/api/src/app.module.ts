import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentsModule } from './agents/agents.module';
import { WeaponsModule } from './weapons/weapons.module';
import { MapsModule } from './maps/maps.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AgentsModule, 
    WeaponsModule, 
    MapsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

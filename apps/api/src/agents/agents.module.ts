import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';

@Module({
  imports: [HttpModule],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
import { Controller, Get, Param } from '@nestjs/common';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
    constructor(private readonly agentsService: AgentsService) {}

    @Get()
    findAll(){
        return this.agentsService.findAll();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string){
        return this.agentsService.findOne(uuid);
    }
}

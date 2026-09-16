import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AgentsService {
  private readonly baseUrl: string;  

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService
) {
    this.baseUrl = this.config.get<string>('VALORANT_API_BASE_URL')!;
}

  async findAll() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/agents`, {
        params: { isPlayableCharacter: true },
      }),
    );
    return data.data;
  }

  async findOne(uuid: string){
    const { data } = await firstValueFrom(
        this.http.get(` ${this.baseUrl}/agents/${uuid}`),
    );
    return data.data;
  }
}

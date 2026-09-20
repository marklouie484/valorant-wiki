import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface RawAgent {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: string;
  fullPortraitV2: string;
  background: string;
  backgroundGradientColors: string[];
  role: {
    displayName: string;
    description: string;
    displayIcon: string;
  } | null;
  abilities: {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string | null;
  }[];
}

@Injectable()
export class AgentsService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('VALORANT_API_BASE_URL')!;
  }

  private mapAgent(agent: RawAgent) {
    return {
      uuid: agent.uuid,
      displayName: agent.displayName,
      description: agent.description,
      displayIcon: agent.displayIcon,
      fullPortraitV2: agent.fullPortraitV2,
      background: agent.background,
      backgroundGradientColors: agent.backgroundGradientColors,
      role: agent.role
        ? {
            displayName: agent.role.displayName,
            description: agent.role.description,
            displayIcon: agent.role.displayIcon,
          }
        : null,
      abilities: agent.abilities
        .filter((ability) => ability.displayName)
        .map((ability) => ({
          slot: ability.slot,
          displayName: ability.displayName,
          description: ability.description,
          displayIcon: ability.displayIcon,
        })),
    };
  }

  async findAll() {
    const { data } = await firstValueFrom(
      this.http.get<{ data: RawAgent[] }>(`${this.baseUrl}/agents`, {
        params: { isPlayableCharacter: true },
      }),
    );
    return data.data.map((agent) => this.mapAgent(agent));
  }

  async findOne(uuid: string) {
    const { data } = await firstValueFrom(
      this.http.get<{ data: RawAgent }>(`${this.baseUrl}/agents/${uuid}`),
    );
    return this.mapAgent(data.data);
  }
}
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

type SkillDemoData = Record<string, Record<string, string>>;

@Injectable()
export class AgentsService {
  private readonly baseUrl: string;
  private readonly supplementalUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('VALORANT_API_BASE_URL')!;
    this.supplementalUrl = this.config.get<string>('MAPS_SUPPLEMENTAL_URL')!;
  }

  private normalizeName(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  private async getSkillDemoData(): Promise<SkillDemoData> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<{ data: SkillDemoData }>(`${this.supplementalUrl}/agents_skills.json`),
      );
      return data.data;
    } catch {
      return {};
    }
  }

  private mapAgent(agent: RawAgent, skillDemos?: Record<string, string>) {
    const normalizedDemos = new Map<string, string>();
    if (skillDemos) {
      for (const [abilityName, url] of Object.entries(skillDemos)) {
        normalizedDemos.set(this.normalizeName(abilityName), url);
      }
    }

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
          videoUrl:
            normalizedDemos.get(this.normalizeName(ability.displayName)) ??
            null,
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
    const [{ data }, skillDemoData] = await Promise.all([
      firstValueFrom(
        this.http.get<{ data: RawAgent }>(`${this.baseUrl}/agents/${uuid}`),
      ),
      this.getSkillDemoData(),
    ]);

    const skillDemos = skillDemoData[data.data.displayName];
    return this.mapAgent(data.data, skillDemos);
  }
}

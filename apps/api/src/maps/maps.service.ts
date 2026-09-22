import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface RawMap {
  uuid: string;
  displayName: string;
  narrativeDescription: string | null;
  tacticalDescription: string | null;
  coordinates: string | null;
  displayIcon: string;
  listViewIcon: string;
  splash: string;
}

interface SupplementalMapInfo {
  displayName: string;
  narrativeDescription: string | null;
  wikiDescription: { description: string | null }[];
  location: string;
}

@Injectable()
export class MapsService {
  private readonly baseUrl: string;
  private readonly supplementalUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('VALORANT_API_BASE_URL')!;
    this.supplementalUrl = this.config.get<string>('MAPS_SUPPLEMENTAL_URL')!;
  }

  private async getSupplementalData(): Promise<SupplementalMapInfo[]> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<{ data: SupplementalMapInfo[] }>(
          `${this.supplementalUrl}/maps_desc.json`,
        ),
      );
      return data.data;
    } catch {
      return [];
    }
  }

  private mapMap(map: RawMap) {
    return {
      uuid: map.uuid,
      displayName: map.displayName,
      coordinates: map.coordinates,
      listViewIcon: map.listViewIcon,
      splash: map.splash,
    };
  }

  private mapMapDetail(map: RawMap, supplemental?: SupplementalMapInfo) {
    const wikiFacts =
      supplemental?.wikiDescription
        ?.map((entry) => entry.description)
        .filter((description): description is string => Boolean(description)) ??
      [];

    return {
      ...this.mapMap(map),
      displayIcon: map.displayIcon,
      narrativeDescription:
        map.narrativeDescription ?? supplemental?.narrativeDescription ?? null,
      tacticalDescription: map.tacticalDescription ?? null,
      wikiFacts,
      location: supplemental?.location?.trim() ?? null,
    };
  }

  async findAll() {
    const { data } = await firstValueFrom(
      this.http.get<{ data: RawMap[] }>(`${this.baseUrl}/maps`),
    );
    return data.data
      .filter((map) => map.displayIcon && map.coordinates)
      .map((map) => this.mapMap(map));
  }

  async findOne(uuid: string) {
    const [{ data }, supplementalList] = await Promise.all([
      firstValueFrom(
        this.http.get<{ data: RawMap }>(`${this.baseUrl}/maps/${uuid}`),
      ),
      this.getSupplementalData(),
    ]);

    const supplemental = supplementalList.find(
      (entry) => entry.displayName === data.data.displayName,
    );

    return this.mapMapDetail(data.data, supplemental);
  }
}

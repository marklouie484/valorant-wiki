import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeaponsService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('VALORANT_API_BASE_URL')!;
  }

  // Weapons
  async findAll() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/weapons`),
    );
    return data.data;
  }

  // Weapon info by uuid
  async findOne(uuid: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/weapons/${uuid}`),
    );
    return data.data;
  }

  // Weapon skins 
  async findAllSkins() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/weapons/skins`),
    );
    return data.data;
  }

  // Weapon skin by uuid
  async findOneSkin(uuid: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/weapons/skins/${uuid}`),
    );
    return data.data;
  }
}
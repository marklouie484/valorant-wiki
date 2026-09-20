import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface RawWeaponSkin {
  uuid: string;
  displayName: string;
  displayIcon: string | null;
}

interface RawWeaponStats {
  fireRate: number;
  magazineSize: number;
  wallPenetration: string;
}

interface RawWeapon {
  uuid: string;
  displayName: string;
  category: string;
  displayIcon: string;
  killStreamIcon: string;
  weaponStats: RawWeaponStats | null;
  shopData: {
    cost: number;
  } | null;
  skins: RawWeaponSkin[];
}

@Injectable()
export class WeaponsService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('VALORANT_API_BASE_URL')!;
  }

  private formatCategory(category: string) {
    return category.replace(/^EEquippableCategory::/, '');
  }

  private formatWallPenetration(value: string) {
    return value.replace(/^EWallPenetrationDisplayType::/, '');
  }

  private mapWeapon(weapon: RawWeapon) {
    return {
      uuid: weapon.uuid,
      displayName: weapon.displayName,
      category: this.formatCategory(weapon.category),
      displayIcon: weapon.displayIcon,
      killStreamIcon: weapon.killStreamIcon,
      cost: weapon.shopData?.cost ?? null,
      skinCount: weapon.skins?.length ?? 0,
    };
  }

  private mapWeaponDetail(weapon: RawWeapon) {
    return {
      ...this.mapWeapon(weapon),
      fireRate: weapon.weaponStats?.fireRate ?? null,
      magazineSize: weapon.weaponStats?.magazineSize ?? null,
      wallPenetration: weapon.weaponStats
        ? this.formatWallPenetration(weapon.weaponStats.wallPenetration)
        : null,
      skins: weapon.skins
        .filter((skin) => skin.displayIcon)
        .map((skin) => ({
          uuid: skin.uuid,
          displayName: skin.displayName,
          displayIcon: skin.displayIcon,
        })),
    };
  }

  async findAll() {
    const { data } = await firstValueFrom(
      this.http.get<{ data: RawWeapon[] }>(`${this.baseUrl}/weapons`),
    );
    return data.data
      .filter((weapon) => weapon.category)
      .map((weapon) => this.mapWeapon(weapon));
  }

  async findOne(uuid: string) {
    const { data } = await firstValueFrom(
      this.http.get<{ data: RawWeapon }>(`${this.baseUrl}/weapons/${uuid}`),
    );
    return this.mapWeaponDetail(data.data);
  }
}
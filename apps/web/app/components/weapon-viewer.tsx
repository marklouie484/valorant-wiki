"use client";

import { useState } from "react";
import WeaponSkinCarousel from "./weapon-skin-carousel";
import type { WeaponDetail } from "./weapons-browser";

export default function WeaponViewer({ weapon }: { weapon: WeaponDetail }) {
  const [selectedSkinUuid, setSelectedSkinUuid] = useState<string | null>(null);

  const selectedSkin = weapon.skins.find((skin) => skin.uuid === selectedSkinUuid);

  const displayName = selectedSkin?.displayName ?? weapon.displayName;
  const displayImage = selectedSkin?.displayIcon ?? weapon.displayIcon;

  return (
    <>
      <h1 className="absolute left-1/2 top-10 z-10 -translate-x-1/2 text-center font-(family-name:--font-tungsten) text-6xl uppercase text-neutral md:text-8xl">
        {displayName}
      </h1>

      <div className="absolute left-1/2 top-1/2 z-0 h-[45vh] w-[80vw] max-w-3xl -translate-x-1/2 -translate-y-1/2">
        {displayImage ? (
          <img
            src={displayImage}
            alt={displayName}
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : null}
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <WeaponSkinCarousel
          skins={weapon.skins}
          selectedSkinUuid={selectedSkinUuid}
          onSelectSkin={setSelectedSkinUuid}
        />
      </div>
    </>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { slugify } from "../lib/slug";
import type { Weapon } from "./weapons-browser";

export default function WeaponCard({ weapon }: { weapon: Weapon }) {
  return (
    <Link
      href={`/weapons/${slugify(weapon.displayName)}`}
      className="group relative block h-80 overflow-hidden rounded-sm bg-[radial-gradient(63%_63.02%_at_50%_85.84%,#343E47_0%,#1A222D_100%)]"
    >
      <div className="absolute left-5 top-5 z-10">
        <h1 className="font-(family-name:--font-tungsten) text-3xl uppercase text-neutral">
          {weapon.displayName}
        </h1>
        <p className="mt-1 font-(family-name:--font-mark-pro) text-xs uppercase tracking-wider text-neutral/50">
          Type // {weapon.category}
        </p>
      </div>

      <div className="absolute left-0 top-0 mt-5 flex h-full w-full items-center justify-center p-8">
        {weapon.displayIcon ? (
          <div className="relative h-full w-full">
            <Image
              src={weapon.displayIcon}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
}
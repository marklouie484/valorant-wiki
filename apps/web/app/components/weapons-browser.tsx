"use client";

import { Search, ListFilter } from "lucide-react";
import { useMemo, useState } from "react";
import WeaponCard from "./weapon-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export type Weapon = {
  uuid: string;
  displayName: string;
  category: string;
  displayIcon?: string;
  killStreamIcon?: string;
  cost?: number | null;
  skinCount?: number;
};

export type WeaponDetail = Weapon & {
  fireRate: number | null;
  magazineSize: number | null;
  wallPenetration: string | null;
  skins: {
    uuid: string;
    displayName: string;
    displayIcon: string;
  }[];
};

type WeaponsBrowserProps = {
  weapons: Weapon[];
};

export default function WeaponsBrowser({ weapons }: WeaponsBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(weapons.map((weapon) => weapon.category).filter(Boolean))).sort(),
    [weapons],
  );

  const filteredWeapons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return weapons
      .filter((weapon) => {
        const matchesQuery =
          !normalizedQuery || weapon.displayName.toLowerCase().includes(normalizedQuery);
        const matchesCategory = category === "all" || weapon.category === category;

        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [weapons, query, category]);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-(family-name:--font-tungsten) text-6xl uppercase text-neutral">
          Weapons
        </h2>
        <div
          className="flex w-full flex-wrap justify-end gap-2.5 sm:w-auto"
          aria-label="Filter weapons"
        >
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="min-h-11 flex-1 gap-2 font-(family-name:--font-mark-pro) hover:cursor-pointer uppercase rounded-full border border-white/22 bg-secondary/55 px-4 text-neutral backdrop-blur-md transition-colors duration-200 hover:bg-secondary/70 focus:border-primary focus:bg-secondary/80 focus:ring-0 data-[state=open]:border-primary sm:flex-none [&>svg]:hidden">
              <span className="flex items-center">
                <ListFilter size={16} aria-hidden="true" />
              </span>
              <SelectValue
                placeholder="All categories"
                className="font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider"
              />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/22 bg-secondary/95 p-2 text-neutral backdrop-blur-md">
              <div className="flex items-center gap-2 px-2 pb-2 pt-1 text-neutral/60">
                <ListFilter size={13} aria-hidden="true" />
                <span className="font-(family-name:--font-mark-pro) text-[0.65rem] font-bold uppercase tracking-wider">
                  Filter by category
                </span>
              </div>
              <SelectItem
                value="all"
                className="rounded-lg px-3 py-2.5 font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider data-highlighted:bg-primary data-highlighted:text-neutral"
              >
                All categories
              </SelectItem>
              {categories.map((weaponCategory) => (
                <SelectItem
                  key={weaponCategory}
                  value={weaponCategory}
                  className="rounded-lg px-3 py-2.5 font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider data-highlighted:bg-primary data-highlighted:text-neutral"
                >
                  {weaponCategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label className="flex min-h-11 flex-1 items-center gap-2 rounded-full border border-white/22 bg-secondary/55 px-4 text-neutral backdrop-blur-md transition-colors duration-200 focus-within:border-primary focus-within:bg-secondary/80 sm:flex-none">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search weapons</span>
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search weapons"
              className="min-w-48 w-full border-0 bg-transparent p-0 font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider text-inherit shadow-none outline-0 placeholder:text-neutral/70 focus-visible:ring-0 sm:w-auto"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        {filteredWeapons.map((weapon) => (
          <WeaponCard key={weapon.uuid} weapon={weapon} />
        ))}
        {!filteredWeapons.length && (
          <p className="col-span-full py-12 px-4 text-center font-(family-name:--font-mark-pro) text-neutral/70">
            No weapons match your search.
          </p>
        )}
      </div>
    </div>
  );
}
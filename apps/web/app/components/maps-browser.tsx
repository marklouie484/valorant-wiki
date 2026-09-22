"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import MapCard from "./map-card";
import { Input } from "@/components/ui/input";

export type MapEntry = {
  uuid: string;
  displayName: string;
  coordinates?: string | null;
  listViewIcon?: string;
  splash?: string;
};

export type MapDetail = MapEntry & {
  narrativeDescription?: string | null;
  tacticalDescription?: string | null;
  displayIcon?: string;
  wikiFacts?: string[];
  location?: string | null;
};

type MapsBrowserProps = {
  maps: MapEntry[];
};

export default function MapsBrowser({ maps }: MapsBrowserProps) {
  const [query, setQuery] = useState("");

  const filteredMaps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return maps
      .filter((map) => !normalizedQuery || map.displayName.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [maps, query]);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-(family-name:--font-tungsten) text-6xl uppercase text-neutral">
          Maps
        </h2>
        <label className="flex min-h-11 w-full items-center gap-2 rounded-full border border-white/22 bg-secondary/55 px-4 text-neutral backdrop-blur-md transition-colors duration-200 focus-within:border-primary focus-within:bg-secondary/80 sm:w-auto">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search maps</span>
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search maps"
            className="min-w-48 w-full border-0 bg-transparent p-0 font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider text-inherit shadow-none outline-0 placeholder:text-neutral/70 focus-visible:ring-0 sm:w-auto"
          />
        </label>
      </div>

      <div className="flex flex-col">
        {filteredMaps.map((map) => (
          <MapCard key={map.uuid} map={map} />
        ))}
        {!filteredMaps.length && (
          <p className="px-8 py-12 text-center font-(family-name:--font-mark-pro) text-neutral/70 md:px-16 lg:px-24">
            No maps match your search.
          </p>
        )}
      </div>
    </div>
  );
}
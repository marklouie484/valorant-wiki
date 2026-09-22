"use client";

import Link from "next/link";
import { useState } from "react";
import { slugify } from "../lib/slug";
import type { MapEntry } from "./maps-browser";

export default function MapCard({ map }: { map: MapEntry }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link
            href={`/maps/${slugify(map.displayName)}`}
            className="group relative block h-70 w-full overflow-hidden"
        >
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-white/10" />
            )}

            {map.splash && (
                <img
                    src={map.splash}
                    alt={`${map.displayName} Image`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaded ? "opacity-100" : "opacity-0"
                        } group-hover:scale-110`}
                />
            )}

            <div className="absolute inset-0 bg-black/25 transition-[background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-secondary/40 group-hover:shadow-[inset_0_0_0_5px_var(--color-primary)]" />

            <h1 className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-(family-name:--font-tungsten) text-5xl uppercase text-neutral transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-7xl group-hover:scale-105">
                {map.displayName}
            </h1>
        </Link>
    );
}
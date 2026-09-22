import Image from "next/image";
import MapsBrowser, { type MapEntry } from "../components/maps-browser";
import mapsHeroPic from "../../public/images/maps-hero.webp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maps",
};

async function getMaps(): Promise<MapEntry[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maps`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch maps");
  }

  return res.json();
}

export default async function MapsPage() {
  const maps = await getMaps();

  return (
    <main className="bg-secondary">
      <section className="relative flex min-h-screen w-full items-center px-4 md:px-16 lg:px-24">
        <Image
          src={mapsHeroPic}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="max-w-xl">
            <p className="font-(family-name:--font-tungsten) text-8xl font-bold uppercase text-neutral">
              MAPS
            </p>
            <h2 className="mt-8 font-(family-name:--font-mark-pro) text-2xl font-medium text-neutral uppercase leading-tight">
              Extract strategic maps
            </h2>
            <p className="font-(family-name:--font-mark-pro) mt-4 font-medium text-lg text-neutral leading-relaxed">
              Navigate every Valorant map with in-depth details on layout, key zones, and its aesthetics. Learn each map’s
              unique features to plan your plays, secure vantage points, and outsmart opponents in every round.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary px-8 pb-20 pt-20 md:px-16 lg:px-24">
        <MapsBrowser maps={maps} />
      </section>
    </main>
  );
}
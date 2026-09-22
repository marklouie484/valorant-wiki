import Image from "next/image";
import weaponsHeroPic from "../../public/images/weapons-hero.webp";
import WeaponsBrowser, { type Weapon } from "../components/weapons-browser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weapons",
};

async function getWeapons(): Promise<Weapon[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weapons`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch weapons");
  }

  return res.json();
}

export default async function WeaponsPage() {
  const weapons = await getWeapons();

  return (
    <main className="bg-secondary">
      <section className="relative flex min-h-screen w-full items-center px-8 md:px-16 lg:px-24">
        <Image
          src={weaponsHeroPic}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="max-w-xl">
            <p className="font-(family-name:--font-tungsten) text-8xl font-bold uppercase text-neutral">
              WEAPONS
            </p>
            <h2 className="mt-8 font-(family-name:--font-mark-pro) text-2xl font-medium text-neutral uppercase leading-tight">
              Learn every types of valorant weapons
            </h2>
            <p className="font-(family-name:--font-mark-pro) mt-4 font-medium text-lg text-neutral leading-relaxed">
              Discover Valorant’s complete weapons set with detailed information on each weapon,
              including types, stats, and available skins. Get familiar with weapon strengths and find the perfect style to
              suit your gameplay.
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen w-full items-start bg-secondary px-8 pb-20 pt-20 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <WeaponsBrowser weapons={weapons} />
        </div>
      </section>
    </main>
  );
}
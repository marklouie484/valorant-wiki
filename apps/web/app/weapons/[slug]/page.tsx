import { notFound } from "next/navigation";
import { slugify } from "../../lib/slug";
import type { Weapon, WeaponDetail } from "../../components/weapons-browser";
import WeaponViewer from "../../components/weapon-viewer";
import weaponInfoBg from "../../../public/images/weapon-info.png";

async function getWeapons(): Promise<Weapon[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weapons`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch weapons");
  }

  return res.json();
}

async function getWeaponDetail(uuid: string): Promise<WeaponDetail> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weapons/${uuid}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch weapon");
  }

  return res.json();
}

export default async function WeaponProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const weapons = await getWeapons();
  const match = weapons.find((item) => slugify(item.displayName) === slug);

  if (!match) {
    notFound();
  }

  const weapon = await getWeaponDetail(match.uuid);

  return (
    <main
      className="relative h-screen w-full overflow-hidden bg-secondary bg-cover bg-center"
      style={{ backgroundImage: `url(${weaponInfoBg.src})` }}
    >
      <div className="absolute inset-0 bg-secondary/50" />

      <WeaponViewer weapon={weapon} />

      <div className="absolute left-15 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-16 xl:right-24">
        <p className="font-(family-name:--font-mark-pro) text-sm font-bold uppercase tracking-wider text-neutral">
          Type: <span className="text-primary">{weapon.category}</span>
        </p>
        {weapon.magazineSize !== null && (
          <p className="font-(family-name:--font-mark-pro) text-sm font-bold uppercase tracking-wider text-neutral">
            Magazine size: <span className="text-primary">{weapon.magazineSize}</span>
          </p>
        )}
        {weapon.fireRate !== null && (
          <p className="font-(family-name:--font-mark-pro) text-sm font-bold uppercase tracking-wider text-neutral">
            Fire rate: <span className="text-primary">{weapon.fireRate} rounds/s</span>
          </p>
        )}
        {weapon.wallPenetration !== null && (
          <p className="font-(family-name:--font-mark-pro) text-sm font-bold uppercase tracking-wider text-neutral">
            Wall penetration: <span className="text-primary">{weapon.wallPenetration}</span>
          </p>
        )}
        {weapon.cost !== null && (
          <p className="font-(family-name:--font-mark-pro) text-sm font-bold uppercase tracking-wider text-neutral md:block lg:left-16 xl:left-24">
            Shop price: <span className="text-primary">{weapon.cost}</span>
          </p>
        )}
      </div>
    </main>
  );
}
import { notFound } from "next/navigation";
import Image from "next/image";
import { slugify } from "../../lib/slug";
import type { MapEntry, MapDetail } from "../../components/maps-browser";
import { Metadata } from "next";

async function getMaps(): Promise<MapEntry[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maps`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch maps");
    }

    return res.json();
}

async function getMapDetail(uuid: string): Promise<MapDetail> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maps/${uuid}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch map");
    }

    return res.json();
}

export default async function MapProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const maps = await getMaps();
    const match = maps.find((item) => slugify(item.displayName) === slug);

    if (!match) {
        notFound();
    }

    const map = await getMapDetail(match.uuid);

    return (
        <main className="min-h-screen bg-secondary">
            <section
                className="relative flex min-h-screen w-full items-end overflow-hidden px-8 pb-20 md:px-16 lg:px-24"
                style={
                    map.splash
                        ? { backgroundImage: `url(${map.splash})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : undefined
                }
            >
                <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-secondary/20" />

                <div className="relative z-10 max-w-2xl">
                    <p className="mb-4 font-(family-name:--font-mark-pro) text-sm font-bold uppercase tracking-[0.2em] text-primary">
                        {map.coordinates || "No coordinates available"}
                    </p>
                    <h1 className="font-(family-name:--font-tungsten) text-7xl uppercase leading-none text-neutral md:text-9xl">
                        {map.displayName}
                    </h1>
                    <p className="mt-3 font-(family-name:--font-mark-pro) text-sm uppercase tracking-wider text-neutral/60">
                        {map.location || "No location available"}
                    </p>
                    <p className="mt-6 font-(family-name:--font-mark-pro) text-lg leading-relaxed text-neutral/80">
                        {map.narrativeDescription || "No description available."}
                    </p>
                </div>
            </section>

            <section className="bg-neutral px-8 py-20 md:px-16 lg:px-24">
                <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
                    <div>
                        <h2 className="mb-6 font-(family-name:--font-tungsten) text-5xl uppercase text-secondary">
                            Tactical Overview
                        </h2>
                        <p className="font-(family-name:--font-mark-pro) text-lg leading-relaxed text-secondary/80">
                            {map.tacticalDescription || "No tactical overview available."}
                        </p>
                        {map.wikiFacts && map.wikiFacts.length > 0 ? (
                            <div className="mt-4 space-y-4">
                                {map.wikiFacts.map((fact, index) => (
                                    <p
                                        key={index}
                                        className="font-(family-name:--font-mark-pro) text-lg leading-relaxed text-secondary/80"
                                    >
                                        {fact}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-4 font-(family-name:--font-mark-pro) text-lg leading-relaxed text-secondary/80">
                                No description available.
                            </p>
                        )}
                    </div>

                    {map.displayIcon ? (
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                            <Image
                                src={map.displayIcon}
                                alt={`${map.displayName} minimap`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain p-4"
                            />
                        </div>
                    ) : (
                        <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-secondary/10 bg-white/30">
                            <p className="font-(family-name:--font-mark-pro) text-sm uppercase tracking-wider text-secondary/50">
                                No minimap available
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
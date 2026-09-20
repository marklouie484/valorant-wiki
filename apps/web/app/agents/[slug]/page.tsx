import { notFound } from "next/navigation";
import Image from "next/image";
import { slugify } from "../../lib/slug";
import type { Agent } from "../../components/agents-browser";

async function getAgents(): Promise<Agent[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch agents");
    }

    return res.json();
}

export default async function AgentProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const agents = await getAgents();
    const agent = agents.find((item) => slugify(item.displayName) === slug);

    if (!agent) {
        notFound();
    }

    const [color1, color2] = agent.backgroundGradientColors
        ? [agent.backgroundGradientColors[2], agent.backgroundGradientColors[0]]
        : [null, null];

    const dynamicGradient =
        color1 && color2
            ? `linear-gradient(286deg, #${color1} 1.34%, #${color2} 119.61%)`
            : undefined;

    return (
        <main className="min-h-screen"
            style={dynamicGradient ? { background: dynamicGradient } : undefined}>
            <section
                className="relative flex min-h-screen w-full items-end overflow-hidden px-8 pb-20 md:px-16 lg:px-24"
                style={
                    agent.background
                        ? { backgroundImage: `url(${agent.background})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : undefined
                }
            >
                <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-secondary/20" />

                <div className="relative z-10 flex w-full max-w-7xl items-end justify-between gap-12">
                    <div className="max-w-xl">
                        {agent.role && (
                            <p className="mb-4 font-(family-name:--font-mark-pro) text-sm font-bold uppercase tracking-[0.2em] text-primary">
                                {agent.role.displayName}
                            </p>
                        )}
                        <h1 className="font-(family-name:--font-tungsten) text-7xl uppercase leading-none text-neutral md:text-9xl">
                            {agent.displayName}
                        </h1>
                        <p className="mt-6 font-(family-name:--font-mark-pro) text-lg leading-relaxed text-neutral/80">
                            {agent.description}
                        </p>
                    </div>
                </div>

                {agent.fullPortraitV2 && (
                    <div className="absolute -bottom-5 right-8 hidden h-225 w-137.5 shrink-0 overflow-hidden md:block lg:right-16 xl:right-24">
                        <div className="absolute inset-0 scale-200">
                            <Image
                                src={agent.fullPortraitV2}
                                alt={agent.displayName}
                                fill
                                sizes="550px"
                                className="object-contain object-bottom"
                                priority
                            />
                        </div>
                    </div>
                )}
            </section>

            {agent.abilities && agent.abilities.length > 0 && (
                <section className="px-8 py-20 md:px-16 lg:px-24"
                style={dynamicGradient ? { background: dynamicGradient } : undefined}>
                    <div className="mx-auto max-w-7xl">
                        <h2 className="mb-10 font-(family-name:--font-tungsten) text-5xl uppercase text-neutral">
                            Special Abilities
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {agent.abilities.map((ability) => (
                                <div
                                    key={ability.slot}
                                    className="rounded-lg border border-secondary/10 bg-secondary/20 p-5"
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        {ability.displayIcon && (
                                            <div className="relative h-10 w-10 shrink-0">
                                                <Image
                                                    src={ability.displayIcon}
                                                    alt={ability.displayName}
                                                    fill
                                                    sizes="40px"
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        <span className="font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider text-primary">
                                            {ability.slot}
                                        </span>
                                    </div>
                                    <h3 className="font-(family-name:--font-tungsten) text-2xl uppercase text-neutral">
                                        {ability.displayName}
                                    </h3>
                                    <p className="mt-2 font-(family-name:--font-mark-pro) text-sm leading-relaxed text-neutral/70">
                                        {ability.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
import { notFound } from "next/navigation";
import Image from "next/image";
import { slugify } from "../../lib/slug";
import type { Agent } from "../../components/agents-browser";
import AgentAbilities from "../../components/agent-abilities";

async function getAgents(): Promise<Agent[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch agents");
    }

    return res.json();
}

async function getAgentDetail(uuid: string): Promise<Agent> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${uuid}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch agent");
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
    const match = agents.find((item) => slugify(item.displayName) === slug);

    if (!match) {
        notFound();
    }

    const agent = await getAgentDetail(match.uuid);

    const [color1, color2] = agent.backgroundGradientColors
        ? [agent.backgroundGradientColors[2], agent.backgroundGradientColors[0]]
        : [null, null];

    const dynamicGradient =
        color1 && color2
            ? `linear-gradient(286deg, #${color1} 1.34%, #${color2} 119.61%)`
            : undefined;

    return (
        <main
            className="min-h-screen"
            style={dynamicGradient ? { background: dynamicGradient } : undefined}
        >
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
                <section
                    className="px-8 py-20 md:px-16 lg:px-24"
                    style={dynamicGradient ? { background: dynamicGradient } : undefined}
                >
                    <div className="mx-auto max-w-7xl">
                        <h2 className="mb-10 font-(family-name:--font-tungsten) text-5xl uppercase text-neutral">
                            Special Abilities
                        </h2>
                        <AgentAbilities abilities={agent.abilities} />
                    </div>
                </section>
            )}
        </main>
    );
}
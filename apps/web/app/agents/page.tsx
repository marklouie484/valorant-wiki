import agentsHeroPic from "../../public/images/agents-hero.webp";
import AgentsBrowser, { type Agent } from "../components/agents-browser";

async function getAgents(): Promise<Agent[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch agents");
  }

  return res.json();
}

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <main className="bg-secondary">
      <section
        className="flex min-h-screen w-full items-center bg-secondary bg-cover bg-center px-8 md:px-16 lg:px-24"
        style={{ backgroundImage: `url(${agentsHeroPic.src})` }}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="max-w-xl">
            <p className="font-(family-name:--font-tungsten) text-8xl font-bold uppercase text-neutral">
              Meet the agents
            </p>
            <h2 className="mt-8 font-(family-name:--font-mark-pro) text-2xl font-medium text-neutral uppercase leading-tight">
              Learn every agent&apos;s abilities
            </h2>
            <p className="font-(family-name:--font-mark-pro) font-medium text-lg text-neutral leading-relaxed">
              Explore every Valorant agent, including their unique roles,
              abilities, and strategic uses. Dive into each agent&apos;s abilities
              with clear descriptions to help you understand how they function
              and how to maximize their potential in every match.
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen w-full items-start bg-secondary bg-cover bg-center px-8 pb-20 pt-20 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <AgentsBrowser agents={agents} />
        </div>
      </section>
    </main>
  );
}
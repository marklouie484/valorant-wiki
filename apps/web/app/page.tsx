import Image from "next/image";
import heroSectionPic from "../../web/public/images/HERO.png";
import sectionOnePic from "../../web/public/images/agent-sect-pic.png";
import sectionTwoPic from "../../web/public/images/weapons-sect-pic.png";
import sectionThreePic from "../../web/public/images/map-sect-pic.jpg";
import neutralDotsBackground from "../../web/public/images/bg-dots-neutral.png";
import primaryDotsBackground from "../../web/public/images/bg-dots-primary.png";

export default async function Home() {
  return (
    <main>
      <section className="relative h-screen min-h-screen w-full overflow-hidden">
        <Image
          src={heroSectionPic}
          alt="VALORANT Wiki"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* AGENTS */}
      <section
        className="flex min-h-screen w-full items-center bg-neutral bg-cover bg-center px-8 md:px-16 lg:px-24"
        style={{ backgroundImage: `url(${neutralDotsBackground.src})` }}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="max-w-xl">
            <p className="font-(family-name:--font-tungsten) text-8xl font-bold uppercase text-secondary">
              Meet the agents
            </p>
            <h2 className="mt-8 font-(family-name:--font-mark-pro) text-2xl font-medium text-secondary uppercase leading-tight">
              Learn every agent&apos;s abilities
            </h2>
            <p className="font-(family-name:--font-mark-pro) font-medium text-lg text-secondary leading-relaxed">
              Explore every Valorant agent, including their unique roles,
              abilities, and strategic uses. Dive into each agent&apos;s abilities
              with clear descriptions to help you understand how they function
              and how to maximize their potential in every match.
            </p>
            <a
              href="/agents"
              className="mt-8 inline-flex bg-primary text-neutral px-8 py-4 font-(family-name:--font-mark-pro) text-md font-bold uppercase
               transition-colors duration-500 hover:bg-secondary"
            >
              View all agents
            </a>
          </div>
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={sectionOnePic}
              alt="Valorant agents placeholder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* WEAPONS */}
      <section
        className="flex min-h-screen w-full items-center bg-primary bg-cover bg-center px-8 md:px-16 lg:px-24"
        style={{ backgroundImage: `url(${primaryDotsBackground.src})` }}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">

          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={sectionTwoPic }
              alt="Valorant agents placeholder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>

          <div className="max-w-xl">
            <p className="font-(family-name:--font-tungsten) text-8xl font-bold uppercase text-neutral">
              Recognize every weapon
            </p>
            <h2 className="mt-8 font-(family-name:--font-mark-pro) text-2xl font-medium text-neutral uppercase leading-tight">
              Learn every types of valorant's weapon
            </h2>
            <p className="font-(family-name:--font-mark-pro) font-medium text-lg text-neutral leading-relaxed">
              Discover Valorant’s complete arsenal set with detailed information on each weapon, including types, stats, and available skins.
              Get familiar with weapon strengths and find the perfect style to suit your gameplay.
            </p>
            <a
              href="/weapons"
              className="mt-8 inline-flex bg-secondary text-neutral px-8 py-4 font-(family-name:--font-mark-pro) text-md font-bold uppercase
               transition-colors duration-500 hover:bg-neutral hover:text-secondary"
            >
              View all weapons
            </a>
          </div>
        </div>
      </section>

      {/* MAPS */}
      <section
        className="flex min-h-screen w-full items-center bg-neutral bg-cover bg-center px-8 md:px-16 lg:px-24"
        style={{ backgroundImage: `url(${neutralDotsBackground.src})` }}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="max-w-xl">
            <p className="font-(family-name:--font-tungsten) text-8xl font-bold uppercase text-secondary">
              Valorant Maps
            </p>
            <h2 className="mt-8 font-(family-name:--font-mark-pro) text-2xl font-medium text-secondary uppercase leading-tight">
              Extract strategic maps
            </h2>
            <p className="font-(family-name:--font-mark-pro) font-medium text-lg text-secondary leading-relaxed">
              Navigate every Valorant map with in-depth details on layout, key zones, and its aesthetics. 
              Learn each map’s unique features to plan your plays, secure vantage points, and outsmart opponents in every round.
            </p>
            <a
              href="/maps"
              className="mt-8 inline-flex bg-primary text-neutral px-8 py-4 font-(family-name:--font-mark-pro) text-md font-bold uppercase
               transition-colors duration-500 hover:bg-secondary"
            >
              View all maps
            </a>
          </div>
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={sectionThreePic}
              alt="Valorant agents placeholder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

    </main>
  );
}

import Image from "next/image";
import sectionAboutPic from "../../public/images/aboutPic.png";
import neutralDotsBackground from "../../public/images/bg-dots-neutral.png";

export default async function AboutPage() {
  return (
    <section
      className="flex min-h-screen w-full items-center bg-neutral bg-cover bg-center px-8 md:px-16 lg:px-24"
      style={{ backgroundImage: `url(${neutralDotsBackground.src})` }}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="max-w-xl">
          <p className="font-(family-name:--font-tungsten) text-8xl font-bold uppercase text-secondary">
            About
          </p>

          <p className="font-(family-name:--font-mark-pro) pt-4 font-medium text-lg text-secondary leading-relaxed">
            Welcome to Valorant Wiki! This site is for a special project, created with a passion for the game and a
            dedication to providing fellow players with the latest information on Valorant's agents, weapons, maps, and updates from Riot Games.
          </p>
          <p className="font-(family-name:--font-mark-pro) pt-4 font-medium text-lg text-secondary leading-relaxed">
            As the sole developer and contributor to this wiki, I’ve worked to make it a reliable resource for players of all levels. From detailed
            weapon stats to agent abilities, this wiki is designed to make learning about Valorant easy and accessible.</p>
          <p className="font-(family-name:--font-mark-pro) pt-4 font-medium text-lg text-secondary leading-relaxed">
            Thank you for visiting, and I hope this site enhances your Valorant experience!
          </p>
          
        </div>
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={sectionAboutPic}
            alt="Valorant agents placeholder"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import type { Agent } from "./agents-browser";
import Image from "next/image";
import { slugify } from "../lib/slug";

export default function AgentCard({ agent }: { agent: Agent }) {
  const imageSrc = agent.fullPortraitV2 || agent.displayIcon;

  return (
    <Link
      href={`/agents/${slugify(agent.displayName)}`}
      className="group relative block h-125 overflow-hidden rounded-sm bg-[radial-gradient(63%_63.02%_at_50%_85.84%,#343E47_0%,#1A222D_100%)]"
    >
      <div className="absolute left-0 -top-15 h-175 w-full overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-rotate-3 group-hover:scale-110"
          />
        ) : null}
      </div>

      <div className="absolute inset-x-0 bottom-[-45%] box-border h-75 w-full bg-neutral p-5 transition-[bottom] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[bottom] group-hover:bottom-0">
        <h1 className="font-(family-name:--font-tungsten) text-3xl uppercase text-secondary">
          {agent.displayName}
        </h1>
        <h4 className="font-(family-name:--font-mark-pro) text-sm uppercase text-primary opacity-0 invisible transition-[opacity,visibility] duration-500 delay-100 ease-out group-hover:visible group-hover:opacity-100">
          {agent.role?.displayName}
        </h4>
        <p className="mt-2 font-(family-name:--font-mark-pro) text-sm text-[#45586E] opacity-0 invisible transition-[opacity,visibility] duration-500 delay-150 ease-out group-hover:visible group-hover:opacity-100">
          {agent.description}
        </p>
      </div>
    </Link>
  );
}
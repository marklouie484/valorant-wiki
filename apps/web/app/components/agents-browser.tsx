"use client";

import { Search, ListFilter } from "lucide-react";
import { useMemo, useState } from "react";
import AgentCard from "./agent-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export type Agent = {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon?: string;
  fullPortraitV2?: string;
  background?: string;
  backgroundGradientColors?: string[];
  role?: {
    displayName: string;
    description?: string;
    displayIcon?: string;
  };
  abilities?: {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string | null;
    videoUrl: string | null;
  }[];
};

type AgentsBrowserProps = {
  agents: Agent[];
};

export default function AgentsBrowser({ agents }: AgentsBrowserProps) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  const roles = useMemo(
    () => Array.from(new Set(agents.map((agent) => agent.role?.displayName).filter(Boolean))).sort(),
    [agents],
  );

  const filteredAgents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return agents
      .filter((agent) => {
        const matchesQuery =
          !normalizedQuery ||
          agent.displayName.toLowerCase().includes(normalizedQuery) ||
          agent.description.toLowerCase().includes(normalizedQuery);
        const matchesRole = role === "all" || agent.role?.displayName === role;

        return matchesQuery && matchesRole;
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [agents, query, role]);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-(family-name:--font-tungsten) text-6xl uppercase text-neutral">
          Agents
        </h2>
        <div
          className="flex w-full flex-wrap justify-end gap-2.5 sm:w-auto"
          aria-label="Filter agents"
        >
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="min-h-11 flex-1 gap-2 font-(family-name:--font-mark-pro) hover:cursor-pointer uppercase rounded-full border border-white/22 bg-secondary/55 px-4 text-neutral backdrop-blur-md transition-colors duration-200 hover:bg-secondary/70 focus:border-primary focus:bg-secondary/80 focus:ring-0 data-[state=open]:border-primary sm:flex-none [&>svg]:hidden">
              <span className="flex items-center">
                <ListFilter size={16} aria-hidden="true" />
              </span>
              <SelectValue
                placeholder="All roles"
                className="font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider"
              />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/22 bg-secondary/95 p-2 text-neutral backdrop-blur-md">
              <div className="flex items-center gap-2 px-2 pb-2 pt-1 text-neutral/60">
                <ListFilter size={13} aria-hidden="true" />
                <span className="font-(family-name:--font-mark-pro) text-[0.65rem] font-bold uppercase tracking-wider">
                  Filter by role
                </span>
              </div>
              <SelectItem
                value="all"
                className="rounded-lg px-3 py-2.5 font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider data-highlighted:bg-primary data-highlighted:text-neutral"
              >
                All roles
              </SelectItem>
              {roles.map((agentRole) => (
                <SelectItem
                  key={agentRole}
                  value={agentRole as string}
                  className="rounded-lg px-3 py-2.5 font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider data-highlighted:bg-primary data-highlighted:text-neutral"
                >
                  {agentRole}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label className="flex min-h-11 flex-1 items-center gap-2 rounded-full border border-white/22 bg-secondary/55 px-4 text-neutral backdrop-blur-md transition-colors duration-200 focus-within:border-primary focus-within:bg-secondary/80 sm:flex-none">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search agents</span>
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search agents"
              className="min-w-48 w-full border-0 bg-transparent p-0 font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider text-inherit shadow-none outline-0 placeholder:text-neutral/70 focus-visible:ring-0 sm:w-auto"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.uuid} agent={agent} />
        ))}
        {!filteredAgents.length && (
          <p className="col-span-full py-12 px-4 text-center font-(family-name:--font-mark-pro) text-neutral/70">
            No agents match your search.
          </p>
        )}
      </div>
    </div>
  );
}
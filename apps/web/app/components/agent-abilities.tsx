"use client";

import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Ability = {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string | null;
    videoUrl: string | null;
};

export default function AgentAbilities({ abilities }: { abilities: Ability[] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.4 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const selected = abilities[selectedIndex];

    // Reset the loading state whenever the selected ability (and therefore
    // the video source) changes, so the skeleton reappears for the new clip.
    useEffect(() => {
        setIsVideoLoaded(false);
    }, [selected]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !selected) return;

        if (isInView && selected.videoUrl) {
            video.play().catch(() => {
                // Autoplay can be blocked by the browser; fail silently
            });
        } else {
            video.pause();
        }
    }, [isInView, selected]);

    if (!abilities.length || !selected) return null;

    return (
        <div ref={containerRef} className="w-full">
            <div className="mb-8 flex flex-wrap gap-3">
                {abilities.map((ability, index) => {
                    const isActive = index === selectedIndex;

                    return (
                        <button
                            key={ability.slot}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            className={`flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-lg border p-2 transition-colors duration-200 ${isActive
                                    ? "border-primary bg-primary/20"
                                    : "border-white/15 bg-white/5 hover:border-white/30"
                                }`}
                        >
                            {ability.displayIcon ? (
                                <div className="relative h-full w-full">
                                    <Image
                                        src={ability.displayIcon}
                                        alt={ability.displayName}
                                        fill
                                        sizes="64px"
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <span className="font-(family-name:--font-mark-pro) text-[0.6rem] font-bold uppercase text-neutral/70">
                                    {ability.slot}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/40">
                    {selected.videoUrl ? (
                        <>
                            {!isVideoLoaded && (
                                <div className="absolute inset-0 z-10 animate-pulse bg-white/10" />
                            )}
                            <video
                                key={selected.videoUrl}
                                ref={videoRef}
                                src={selected.videoUrl}
                                muted={isMuted}
                                loop
                                playsInline
                                onLoadedData={() => setIsVideoLoaded(true)}
                                className={`h-full w-full object-cover transition-opacity duration-500 ${isVideoLoaded ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setIsMuted((prev) => !prev)}
                                className="absolute bottom-3 right-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-neutral"
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                        </>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <p className="font-(family-name:--font-mark-pro) text-sm uppercase tracking-wider text-neutral/50">
                                No demo available
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <span className="font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider text-primary">
                        {selected.slot}
                    </span>
                    <h3 className="mt-2 font-(family-name:--font-tungsten) text-4xl uppercase text-neutral">
                        {selected.displayName}
                    </h3>
                    <p className="mt-4 font-(family-name:--font-mark-pro) text-base leading-relaxed text-neutral/70">
                        {selected.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
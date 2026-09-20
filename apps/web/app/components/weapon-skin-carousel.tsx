"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

type Skin = {
    uuid: string;
    displayName: string;
    displayIcon: string;
};

type WeaponSkinCarouselProps = {
    skins: Skin[];
    selectedSkinUuid: string | null;
    onSelectSkin: (uuid: string | null) => void;
};

export default function WeaponSkinCarousel({
    skins,
    selectedSkinUuid,
    onSelectSkin,
}: WeaponSkinCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        const updateCurrent = () => {
            const lastVisible = Math.min((api.selectedScrollSnap() + 1) * 3, skins.length);
            setCurrent(lastVisible);
        };

        updateCurrent();
        api.on("select", updateCurrent);
        api.on("reInit", updateCurrent);

        return () => {
            api.off("select", updateCurrent);
            api.off("reInit", updateCurrent);
        };
    }, [api, skins.length]);

    if (!skins.length) return null;

    return (
        <div className="w-full max-w-md">
            <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-3">
                    {skins.map((skin) => {
                        const isSelected = skin.uuid === selectedSkinUuid;

                        return (
                            <CarouselItem key={skin.uuid} className="basis-1/3 pl-3">
                                <button
                                    type="button"
                                    onClick={() => onSelectSkin(isSelected ? null : skin.uuid)}
                                    className={`flex aspect-square w-full items-center cursor-pointer justify-center rounded-lg border p-2 backdrop-blur-md transition-colors duration-200 ${isSelected
                                            ? "border-primary bg-primary/20"
                                            : "border-white/15 bg-secondary/60 hover:border-white/30"
                                        }`}
                                >
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={skin.displayIcon}
                                            alt={skin.displayName}
                                            fill
                                            sizes="120px"
                                            className="object-contain"
                                        />
                                    </div>
                                </button>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="-left-10 border-white/22 bg-secondary/70 text-neutral hover:bg-secondary/90 hover:text-primary" />
                <CarouselNext className="-right-10 border-white/22 bg-secondary/70 text-neutral hover:bg-secondary/90 hover:text-primary" />
            </Carousel>
            <p className="mt-3 text-center font-(family-name:--font-mark-pro) text-xs font-bold uppercase tracking-wider text-neutral/60">
                {current}/{skins.length}
            </p>
        </div>
    );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Info, MapPin, Swords, UsersRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const navigationItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Agents", href: "/agents", icon: UsersRound },
    { label: "Weapons", href: "/weapons", icon: Swords },
    { label: "Maps", href: "/maps", icon: MapPin },
    { label: "About", href: "/about", icon: Info },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const capsuleRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({
        left: 0,
        width: 0,
    });

    const activeIndex = navigationItems.findIndex((item) =>
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    );
    const isHome = pathname === "/";

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
            return;
        }

        router.push("/");
    };

    useLayoutEffect(() => {
        const activeLink = linkRefs.current[activeIndex];
        const capsule = capsuleRef.current;
        if (activeLink && capsule) {
            const capsuleRect = capsule.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            setPillStyle({
                left: linkRect.left - capsuleRect.left,
                width: linkRect.width,
            });
        }
    }, [activeIndex, pathname]);

    useEffect(() => {
        const handleResize = () => {
            const activeLink = linkRefs.current[activeIndex];
            const capsule = capsuleRef.current;
            if (activeLink && capsule) {
                const capsuleRect = capsule.getBoundingClientRect();
                const linkRect = activeLink.getBoundingClientRect();
                setPillStyle({
                    left: linkRect.left - capsuleRect.left,
                    width: linkRect.width,
                });
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeIndex]);

    return (
        <nav className="site-navbar px-5 pt-4" aria-label="Main navigation">
            <div className="site-navbar__brand">
                {!isHome && (
                    <button
                        type="button"
                        className="site-navbar__back"
                        onClick={handleBack}
                        aria-label="Go back to the previous page"
                    >
                        <ArrowLeft size={20} strokeWidth={2.25} aria-hidden="true" />
                    </button>
                )}
                <Link href="/" className="site-navbar__logo" aria-label="Valorant Wiki home">
                    <Image src="/images/logo.svg" alt="Valorant Wiki" width={60} height={60} priority />
                </Link>
            </div>
            <div className="site-navbar__capsule" ref={capsuleRef}>
                <span
                    className="site-navbar__pill"
                    style={{
                        transform: `translateX(${pillStyle.left}px)`,
                        width: `${pillStyle.width}px`,
                    }}
                />
                {navigationItems.map((item, index) => {
                    const isActive = index === activeIndex;

                    return ( 
                        <Link
                            key={item.href}
                            href={item.href}
                            ref={(el) => {
                                linkRefs.current[index] = el;
                            }}
                            className={`site-navbar__link${isActive ? " is-active" : ""}`}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {isActive && <item.icon size={14} strokeWidth={2.5} aria-hidden="true" />}
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
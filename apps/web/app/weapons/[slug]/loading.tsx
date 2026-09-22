export default function WeaponDetailLoading() {
    return (
        <main className="relative h-screen w-full overflow-hidden bg-secondary">
            <div className="absolute inset-0 bg-secondary/50" />

            <div className="animate-pulse">
               
                <div className="absolute left-1/2 top-10 z-10 h-16 w-72 -translate-x-1/2 rounded bg-white/10 md:h-20 md:w-96" />

                <div className="absolute left-1/2 top-1/2 z-0 h-[45vh] w-[80vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/5" />

                <div className="absolute left-15 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-16 xl:right-24">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="h-4 w-40 rounded bg-white/10" />
                    ))}
                </div>

                <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
                    <div className="flex gap-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="h-24 w-24 rounded-lg bg-white/10" />
                        ))}
                    </div>
                    <div className="mx-auto mt-3 h-3 w-12 rounded bg-white/10" />
                </div>
            </div>
        </main>
    );
}
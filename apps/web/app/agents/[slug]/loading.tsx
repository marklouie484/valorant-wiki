export default function AgentDetailLoading() {
    return (
        <main className="min-h-screen bg-secondary">
            <section className="relative flex min-h-screen w-full items-end overflow-hidden px-8 pb-20 md:px-16 lg:px-24">
                <div className="relative z-10 flex w-full max-w-7xl animate-pulse items-end justify-between gap-12">
                    <div className="max-w-xl">
                        <div className="mb-4 h-4 w-24 rounded bg-white/10" />
                        <div className="h-20 w-80 rounded bg-white/10" />
                        <div className="mt-6 h-24 w-full rounded bg-white/10" />
                    </div>
                </div>

                <div className="absolute -bottom-5 right-8 hidden h-100 w-137.5 animate-pulse rounded-lg bg-white/5 md:block lg:right-16 xl:right-24" />
            </section>

            <section className="px-8 py-20 md:px-16 lg:px-24">
                <div className="mx-auto max-w-7xl animate-pulse">
                    <div className="mb-10 h-12 w-64 rounded bg-white/10" />
                    <div className="mb-8 flex flex-wrap gap-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="h-16 w-16 rounded-lg bg-white/10" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="aspect-video w-full rounded-lg bg-white/10" />
                        <div>
                            <div className="h-4 w-20 rounded bg-white/10" />
                            <div className="mt-2 h-10 w-48 rounded bg-white/10" />
                            <div className="mt-4 h-20 w-full rounded bg-white/10" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
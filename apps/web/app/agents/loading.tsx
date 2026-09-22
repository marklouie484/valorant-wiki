export default function AgentsLoading() {
    return (
        <main className="bg-secondary">
            {/* Hero section skeleton */}
            <section className="flex min-h-screen w-full items-center bg-secondary px-4 md:px-16 lg:px-24">
                <div className="mx-auto grid w-full max-w-7xl animate-pulse items-center gap-12 md:grid-cols-2 md:gap-20">
                    <div className="max-w-xl">
                        <div className="h-24 w-full rounded bg-white/10" />
                        <div className="mt-8 h-6 w-3/4 rounded bg-white/10" />
                        <div className="mt-4 h-20 w-full rounded bg-white/10" />
                    </div>
                </div>
            </section>

            {/* Agents grid section skeleton */}
            <section className="flex min-h-screen w-full items-start bg-secondary px-8 pb-20 pt-20 md:px-16 lg:px-24">
                <div className="mx-auto w-full max-w-7xl animate-pulse">
                    <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="h-14 w-48 rounded bg-white/10" />
                        <div className="flex gap-2.5">
                            <div className="h-11 w-32 rounded-full bg-white/10" />
                            <div className="h-11 w-48 rounded-full bg-white/10" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="h-125 w-full rounded-sm bg-white/10" />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
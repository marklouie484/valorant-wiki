export default function MapsLoading() {
    return (
        <main className="bg-secondary">
            <section className="flex min-h-screen w-full items-center bg-secondary px-4 md:px-16 lg:px-24">
                <div className="mx-auto grid w-full max-w-7xl animate-pulse items-center gap-12 md:grid-cols-2 md:gap-20">
                    <div className="max-w-xl">
                        <div className="h-24 w-full rounded bg-white/10" />
                        <div className="mt-8 h-6 w-3/4 rounded bg-white/10" />
                        <div className="mt-4 h-20 w-full rounded bg-white/10" />
                    </div>
                </div>
            </section>

            <section className="w-full bg-secondary px-8 pb-20 pt-20 md:px-16 lg:px-24">
                <div className="animate-pulse">
                    <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="h-14 w-48 rounded bg-white/10" />
                        <div className="h-11 w-64 rounded-full bg-white/10" />
                    </div>

                    <div className="flex flex-col gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="h-70 w-full bg-white/10" />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
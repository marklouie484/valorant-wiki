export default function MapDetailLoading() {
    return (
        <main className="min-h-screen bg-secondary">
            <section className="relative flex min-h-screen w-full items-end overflow-hidden px-8 pb-20 md:px-16 lg:px-24">
                <div className="relative z-10 max-w-2xl animate-pulse">
                    <div className="mb-4 h-4 w-32 rounded bg-white/10" />
                    <div className="h-20 w-96 rounded bg-white/10" />
                    <div className="mt-3 h-3 w-48 rounded bg-white/10" />
                    <div className="mt-6 h-24 w-full rounded bg-white/10" />
                </div>
            </section>

            <section className="bg-neutral px-8 py-20 md:px-16 lg:px-24">
                <div className="mx-auto grid w-full max-w-6xl animate-pulse items-center gap-12 md:grid-cols-2 md:gap-20">
                    <div>
                        <div className="mb-6 h-12 w-64 rounded bg-secondary/10" />
                        <div className="h-4 w-full rounded bg-secondary/10" />
                        <div className="mt-2 h-4 w-5/6 rounded bg-secondary/10" />
                        <div className="mt-2 h-4 w-3/4 rounded bg-secondary/10" />
                    </div>
                    <div className="aspect-square w-full rounded-lg bg-secondary/10" />
                </div>
            </section>
        </main>
    );
}
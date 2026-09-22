export default function HomeLoading() {
    return (
        <main className="animate-pulse">
            <section className="relative h-screen min-h-screen w-full bg-white/5" />

            <section className="flex min-h-screen w-full items-center bg-neutral px-8 md:px-16 lg:px-24">
                <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
                    <div className="max-w-xl">
                        <div className="h-24 w-full rounded bg-secondary/10" />
                        <div className="mt-8 h-6 w-3/4 rounded bg-secondary/10" />
                        <div className="mt-8 h-20 w-full rounded bg-secondary/10" />
                        <div className="mt-8 h-12 w-40 rounded bg-secondary/10" />
                    </div>
                    <div className="aspect-4/3 w-full rounded bg-secondary/10" />
                </div>
            </section>
        </main>
    );
}
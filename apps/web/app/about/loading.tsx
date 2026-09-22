export default function AboutLoading() {
    return (
        <section className="flex min-h-screen w-full items-center bg-neutral px-8 md:px-16 lg:px-24">
            <div className="mx-auto grid w-full max-w-7xl animate-pulse items-center gap-12 md:grid-cols-2 md:gap-20">
                <div className="max-w-xl">
                    <div className="h-24 w-48 rounded bg-secondary/10" />
                    <div className="mt-6 h-20 w-full rounded bg-secondary/10" />
                    <div className="mt-4 h-20 w-full rounded bg-secondary/10" />
                    <div className="mt-4 h-16 w-full rounded bg-secondary/10" />
                </div>
                <div className="aspect-4/3 w-full rounded bg-secondary/10" />
            </div>
        </section>
    );
}
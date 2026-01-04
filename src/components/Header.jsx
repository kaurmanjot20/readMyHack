
export default function Header() {
    return (
        <header className="py-12 text-center max-w-4xl mx-auto">
            <div className="text-accent text-sm font-medium mb-4 tracking-wide uppercase">
                ReadMyHack
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
                Turn your GitHub repo into a judge-ready hackathon submission.
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                ReadMyHack generates a clear problem statement, solution overview and a 2-minute demo script, in seconds.
            </p>
        </header>
    );
}

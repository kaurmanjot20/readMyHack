
export default function Header() {
    return (
        <header className="py-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                ReadMyHack
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto px-4">
                Turn your GitHub repository into a judge-ready hackathon submission in seconds.
                <br className="hidden sm:block" />
                Instant problem statement, solution overview, and demo script.
            </p>
        </header>
    );
}

export default function AboutPage() {
  return (
    <div className="cyber-bg min-h-screen font-sans">
      <main className="max-w-[960px] mx-auto px-6 py-10">
        <a href="/" className="text-accent text-sm hover:underline mb-4 inline-block">
          {'← Back to site'}
        </a>
        <h1 className="text-2xl font-bold text-foreground mb-4">About this Digital Twin</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          Every production web app is a target. This Digital Twin turns that risk into a teaching
          tool: a controlled cyber range where you can deliberately attack, observe detections and
          blocks, practise incident response, and document how you harden the system release by
          release.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          For hiring managers, this site is both a portfolio and a live security case study: it
          hosts my professional identity and projects, exposes safe attack surfaces, and shows how
          I manage security as an ongoing lifecycle instead of a one-time checkbox.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Use this page to understand the intent behind the lab, how it was built, and how it fits
          into real-world expectations for secure, observable web systems.
        </p>
      </main>
    </div>
  );
}

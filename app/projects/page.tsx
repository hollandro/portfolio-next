type Project = {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    name: "Portfolio Website",
    description: "Personal portfolio and flyer request site built with React and Next.js.",
    tech: ["React", "Next.js", "CSS"],
    live: "https://rochelleholland.org",
  },
];

export const metadata = { title: "Projects | Rochelle Holland" };

export default function Projects() {
  return (
    <main className="section narrow">
      <h1>Projects</h1>
      <p className="lead">Things I've built.</p>
      <div className="stack">
        {projects.map((p) => (
          <article key={p.name} className="project">
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <div className="tags">{p.tech.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            <div className="row">
              {p.github && <a className="btn ghost small" href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
              {p.live && <a className="btn small" href={p.live} target="_blank" rel="noreferrer">Live site</a>}
            </div>
          </article>
        ))}
      </div>
      <p>More coming soon.</p>
    </main>
  );
}
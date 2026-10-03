import Link from "next/link";
import Typing from "./typing";

const tags = ["Computer Science", "University of Colorado", "Developer", "Flyer designer"];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <Typing />
          <div className="tags">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          <div className="row">
            <Link href="/flyer" className="btn">Request a flyer</Link>
            <Link href="/projects" className="btn ghost">See projects</Link>
          </div>
        </div>
        <figure className="photo">
          <div className="photo-frame" role="img" aria-label="Rochelle Holland" />
          <figcaption>Rochelle Holland · Denver, CO</figcaption>
        </figure>
      </section>
    </main>
  );
}
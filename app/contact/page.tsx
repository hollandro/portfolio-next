"use client";
import { useState, type FormEvent } from "react";

const links: [string, string, string][] = [
  ["Email", "mailto:rochellehdev@yahoo.com", "rochellehdev@yahoo.com"],
  ["LinkedIn", "https://www.linkedin.com/in/rochelle-holland-1b9400409/", "rochelle-holland"],
  ["GitHub", "https://github.com/hollandro", "github.com/hollandro"],
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const body = Object.fromEntries(new FormData(e.currentTarget));
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  return (
    <main className="section narrow">
      <h1>Say hello</h1>
      <p className="lead">I'd love to hear from you.</p>
      <ul className="contact-list">
        {links.map(([label, href, text]) => (
          <li key={label}><strong>{label}</strong> <a href={href} target="_blank" rel="noreferrer">{text}</a></li>
        ))}
        <li><strong>Location</strong> Denver, Colorado</li>
      </ul>

      {status === "done" ? (
        <>
          <p className="lead">Message sent! I'll get back to you soon.</p>
          <div className="row">
            <button className="btn" onClick={() => setStatus("idle")}>Send another message</button>
          </div>
        </>
      ) : (
        <form onSubmit={onSubmit} className="contact-form">
          <label className="field"><span>Name</span><input name="name" required /></label>
          <label className="field"><span>Email</span><input name="email" type="email" required /></label>
          <label className="field"><span>Message</span><textarea name="message" rows={5} required placeholder="What's on your mind?" /></label>
          {error && <p className="error" role="alert">{error}</p>}
          <button className="btn" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
        </form>
      )}
    </main>
  );
}
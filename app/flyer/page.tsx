"use client";
import { useState, type FormEvent, type ReactNode } from "react";

const styles = ["Modern", "Professional", "Bold", "Minimal", "Luxury", "Colorful", "Let me decide"];
const sizes = ["8.5 x 11 in (Letter)", "5 x 7 in", "4 x 6 in", "A4", "A5", "1080 x 1080 px (Instagram)", "1080 x 1920 px (Story)", "Not sure"];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

export default function FlyerPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/flyer", { method: "POST", body: new FormData(e.currentTarget) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <main className="section narrow">
        <h1>Request sent</h1>
        <p className="lead">Thanks! I'll review your details and reply by email within one business day.</p>
        <div className="row">
          <button className="btn" onClick={() => setStatus("idle")}>Submit another request</button>
        </div>
      </main>
    );
  }

  return (
    <main className="section narrow">
      <h1>Flyer request</h1>
      <p className="lead">Answer what you can. Anything you skip we can sort out together.</p>

      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Your information</legend>
          <Field label="Name"><input name="name" required autoComplete="name" /></Field>
          <Field label="Business name"><input name="business" autoComplete="organization" /></Field>
          <Field label="Email"><input name="email" type="email" required autoComplete="email" /></Field>
          <Field label="Phone"><input name="phone" type="tel" autoComplete="tel" /></Field>
        </fieldset>

        <fieldset>
          <legend>Flyer details</legend>
          <Field label="What is the flyer for?"><input name="purpose" placeholder="Grand opening, sale, event…" /></Field>
          <Field label="What service, product or event are you promoting?"><textarea name="promoting" rows={3} /></Field>
          <Field label="What information must appear on the flyer?"><textarea name="mustInclude" rows={3} placeholder="Date, address, website, hours…" /></Field>
          <Field label="Do you have a special offer or promotion?"><textarea name="offer" rows={2} /></Field>
        </fieldset>

        <fieldset>
          <legend>Design</legend>
          <div className="field">
            <span>Preferred style</span>
            <div className="chips">
              {styles.map((s) => (
                <label key={s} className="chip"><input type="checkbox" name="style" value={s} /><em>{s}</em></label>
              ))}
            </div>
          </div>
          <Field label="Preferred colors"><input name="colors" placeholder="Navy and gold, brand colors…" /></Field>
          <div className="field">
            <span>Do you have a logo?</span>
            <div className="chips">
              {["Yes", "No"].map((v) => (
                <label key={v} className="chip"><input type="radio" name="hasLogo" value={v} /><em>{v}</em></label>
              ))}
            </div>
            <input name="logo" type="file" accept="image/*,.pdf,.ai,.eps,.svg" />
          </div>
          <Field label="Images you'd like included"><input name="images" type="file" multiple accept="image/*" /></Field>
          <Field label="Example or inspiration"><textarea name="inspiration" rows={2} placeholder="Paste a link or describe a flyer you like" /></Field>
        </fieldset>

        <fieldset>
          <legend>Final details</legend>
          <Field label="Flyer size">
            <select name="size" defaultValue="">
              <option value="" disabled>Choose a size</option>
              {sizes.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <div className="field">
            <span>Format</span>
            <div className="chips">
              {["Digital", "Print", "Both"].map((v) => (
                <label key={v} className="chip"><input type="radio" name="format" value={v} /><em>{v}</em></label>
              ))}
            </div>
          </div>
          <Field label="Desired deadline"><input name="deadline" type="date" /></Field>
          <Field label="Additional notes"><textarea name="notes" rows={3} /></Field>
        </fieldset>

        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send request"}
        </button>
      </form>
    </main>
  );
}
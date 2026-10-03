"use client";
import { useEffect, useState } from "react";

const TEXT = [
  "Hi! My name is Rochelle Holland.",
  "I'm a junior at the University of Colorado majoring in Computer Science.",
  "I also design flyers for local businesses. This site is my portfolio and the place to request one.",
].join("\n\n");

export default function Typing() {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(TEXT.length);
      return;
    }
    const id = setInterval(() => setN((v) => (v >= TEXT.length ? v : v + 1)), 32);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="typing">
      <p className="sr">{TEXT.replace(/\n\n/g, " ")}</p>
      <div aria-hidden="true">
        {TEXT.slice(0, n).split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
        <span className="cursor">|</span>
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/projects", "Projects"],
  ["/flyer", "Flyers"],
  ["/contact", "Contact"],
];

export default function Navlinks() {
  const pathname = usePathname();
  return (
    <nav>
      {links.map(([href, label]) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link key={href} href={href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
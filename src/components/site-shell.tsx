import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span
              className="grid size-8 place-items-center rounded-lg text-sm font-bold text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-signal)" }}
              aria-hidden
            >
              SB
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              SignBridge
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              to="/"
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              Overview
            </Link>
            <Link
              to="/research"
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Research
            </Link>
            <Link
              to="/call"
              className="ml-2 rounded-md bg-primary px-3.5 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Live prototype
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto max-w-6xl px-5 text-xs text-muted-foreground">
          SignBridge — Phase-1 closed-vocabulary prototype. Grand Hack IPEC 2026.
        </div>
      </footer>
    </div>
  );
}

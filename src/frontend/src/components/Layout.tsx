import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            search={{ categories: undefined }}
            className="flex items-center gap-2.5 group"
            data-ocid="nav.home_link"
          >
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center transition-smooth group-hover:scale-105">
              <MapPin className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight">
              Event Finder
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              to="/"
              search={{ categories: undefined }}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
              data-ocid="nav.events_link"
            >
              Events
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-muted/40 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-display font-semibold text-foreground">
              Event Finder
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// App.tsx — Single-file Event Finder
// All components, hooks, types, and utilities are inlined here.
// Only external package imports are used.
// ============================================================

import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import {
  ArrowLeft,
  CalendarDays,
  Cpu,
  MapPin,
  Music,
  Tag,
  UtensilsCrossed,
} from "lucide-react";
import type { ReactNode } from "react";
import { Suspense, lazy } from "react";
import { twMerge } from "tailwind-merge";
import { createActor } from "./backend";
import { Category } from "./backend";
import type { Event } from "./backend";

// ============================================================
// Utility: cn()
// ============================================================

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ============================================================
// Hooks: useEvents, useFilteredEvents
// ============================================================

function useEvents() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

function useFilteredEvents(categories: Category[]) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["events", "filtered", categories],
    queryFn: async () => {
      if (!actor) return [];
      if (categories.length === 0) {
        return actor.listEvents();
      }
      return actor.filterByCategory(categories);
    },
    enabled: !!actor && !isFetching,
  });
}

// ============================================================
// Component: Layout
// ============================================================

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
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

// ============================================================
// Component: EventCard
// ============================================================

const CATEGORY_BADGE_STYLES: Record<Category, string> = {
  [Category.Music]: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  [Category.Tech]: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  [Category.Food]: "bg-accent/20 text-accent border-accent/30",
};

const CATEGORY_DOT: Record<Category, string> = {
  [Category.Music]: "bg-purple-400",
  [Category.Tech]: "bg-blue-400",
  [Category.Food]: "bg-accent",
};

interface EventCardProps {
  event: Event;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  return (
    <Link
      to="/events/$eventId"
      params={{ eventId: event.id.toString() }}
      data-ocid={`event.item.${index}`}
      className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 hover:shadow-lg transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="p-5 flex flex-col gap-3 h-full">
        {/* Category badge */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide ${CATEGORY_BADGE_STYLES[event.category]}`}
            data-ocid={`event.category_badge.${index}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[event.category]}`}
            />
            {event.category}
          </span>
          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth font-medium">
            View →
          </span>
        </div>

        {/* Event name */}
        <h3 className="font-display font-bold text-lg text-card-foreground leading-snug group-hover:text-accent transition-smooth line-clamp-2">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {event.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 pt-1 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="w-3.5 h-3.5 shrink-0 text-accent/70" />
            <span className="truncate">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-accent/70" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ============================================================
// Component: CategoryFilterPills
// ============================================================

const PILL_CONFIG: {
  category: Category;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
}[] = [
  {
    category: Category.Music,
    label: "Music",
    icon: Music,
    activeClass:
      "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/10",
  },
  {
    category: Category.Tech,
    label: "Tech",
    icon: Cpu,
    activeClass:
      "bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm shadow-blue-500/10",
  },
  {
    category: Category.Food,
    label: "Food",
    icon: UtensilsCrossed,
    activeClass:
      "bg-accent/20 text-accent border-accent/50 shadow-sm shadow-accent/10",
  },
];

interface CategoryFilterPillsProps {
  selected: Category[];
  onChange: (categories: Category[]) => void;
  counts?: Record<Category, number>;
}

function CategoryFilterPills({
  selected,
  onChange,
  counts,
}: CategoryFilterPillsProps) {
  const toggle = (cat: Category) => {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  };

  const clearAll = () => onChange([]);

  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      data-ocid="category.filter_section"
    >
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
        Filter:
      </span>

      {PILL_CONFIG.map(({ category, label, icon: Icon, activeClass }) => {
        const isActive = selected.includes(category);
        const count = counts?.[category];
        return (
          <button
            key={category}
            type="button"
            onClick={() => toggle(category)}
            aria-pressed={isActive}
            data-ocid={`category.filter_pill.${label.toLowerCase()}`}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium",
              "border transition-smooth cursor-pointer select-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? activeClass
                : "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            {label}
            {count !== undefined && (
              <span
                className={cn(
                  "ml-0.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1",
                  "rounded-full text-[10px] font-bold tabular-nums leading-none",
                  isActive
                    ? "bg-white/20 text-current"
                    : "bg-border text-muted-foreground",
                )}
                data-ocid={`category.count_badge.${label.toLowerCase()}`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}

      {selected.length > 0 && (
        <button
          type="button"
          onClick={clearAll}
          data-ocid="category.clear_button"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-transparent hover:border-border hover:text-foreground hover:bg-muted/50 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

// ============================================================
// Page: EventsPage
// ============================================================

function parseCategories(value: string | undefined): Category[] {
  if (!value) return [];
  return value
    .split(",")
    .filter((v): v is Category =>
      Object.values(Category).includes(v as Category),
    );
}

function buildCounts(
  events: { category: Category }[],
): Record<Category, number> {
  const counts = {
    [Category.Music]: 0,
    [Category.Tech]: 0,
    [Category.Food]: 0,
  };
  for (const e of events) counts[e.category]++;
  return counts;
}

function EventsPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/" });
  const selected = parseCategories(search.categories);

  const { data: allEvents } = useEvents();
  const { data: events, isLoading, isError } = useFilteredEvents(selected);

  const counts = allEvents ? buildCounts(allEvents) : undefined;

  const handleCategoryChange = (cats: Category[]) => {
    void navigate({
      to: "/",
      search:
        cats.length > 0
          ? { categories: cats.join(",") }
          : { categories: undefined },
      replace: true,
    });
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero banner */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-1 mb-6">
            <h1
              className="font-display font-bold text-3xl sm:text-4xl text-foreground"
              data-ocid="events.page_title"
            >
              Discover Events
            </h1>
            <p className="text-muted-foreground text-base">
              Find Music, Tech, and Food events happening near you.
            </p>
          </div>
          <CategoryFilterPills
            selected={selected}
            onChange={handleCategoryChange}
            counts={counts}
          />
        </div>
      </div>

      {/* Event grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            data-ocid="events.loading_state"
          >
            {(["a", "b", "c", "d", "e", "f", "g", "h"] as const).map((k) => (
              <div
                key={k}
                className="bg-card border border-border rounded-xl p-5 space-y-3"
              >
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="pt-2 space-y-2 border-t border-border/50">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3.5 w-40" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="events.error_state"
          >
            <CalendarDays className="w-12 h-12 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground font-medium">
              Could not load events. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && events && events.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="events.empty_state"
          >
            <CalendarDays className="w-14 h-14 text-accent/40 mb-4" />
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {selected.length > 0
                ? "No events match your selected categories. Try clearing some filters."
                : "There are no events yet. Check back soon!"}
            </p>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => handleCategoryChange([])}
                data-ocid="events.clear_filters_button"
                className="mt-4 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-smooth"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {!isLoading && !isError && events && events.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {events.length}
                </span>{" "}
                {events.length === 1 ? "event" : "events"} found
                {selected.length > 0 && (
                  <span> · filtered by {selected.join(", ")}</span>
                )}
              </p>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              data-ocid="events.list"
            >
              {events.map((event, index) => (
                <EventCard
                  key={event.id.toString()}
                  event={event}
                  index={index + 1}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Page: EventDetailPage
// ============================================================

const DETAIL_CATEGORY_BADGE_STYLES: Record<Category, string> = {
  [Category.Music]: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  [Category.Tech]: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  [Category.Food]: "bg-accent/20 text-accent border-accent/30",
};

function EventDetailPage() {
  const { eventId } = useParams({ strict: false }) as { eventId: string };
  const { data: events, isLoading, isError } = useEvents();

  const event = events?.find((e) => e.id.toString() === eventId);

  if (isLoading) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        data-ocid="event_detail.loading_state"
      >
        <Skeleton className="h-5 w-24 mb-6" />
        <Skeleton className="h-9 w-2/3 mb-3" />
        <Skeleton className="h-5 w-1/3 mb-8" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center"
        data-ocid="event_detail.error_state"
      >
        <CalendarDays className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-muted-foreground font-medium mb-4">
          {isError ? "Could not load event details." : "Event not found."}
        </p>
        <Link
          to="/"
          search={{ categories: undefined }}
          className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          data-ocid="event_detail.back_link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background" data-ocid="event_detail.page">
      {/* Top bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            search={{ categories: undefined }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="event_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to events
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category + title */}
        <div className="mb-6">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide mb-4 ${DETAIL_CATEGORY_BADGE_STYLES[event.category]}`}
            data-ocid="event_detail.category_badge"
          >
            <Tag className="w-3 h-3" />
            {event.category}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight mt-3">
            {event.name}
          </h1>
        </div>

        {/* Meta card */}
        <div className="bg-card border border-border rounded-xl p-5 mb-8 grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                Date & Time
              </p>
              <p className="text-sm font-semibold text-foreground">
                {event.date}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                Location
              </p>
              <p className="text-sm font-semibold text-foreground">
                {event.location}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-sm max-w-none">
          <h2 className="font-display font-bold text-lg text-foreground mb-3">
            About this event
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base">
            {event.description}
          </p>
        </div>

        {/* Related category */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            Browse more events in this category:
          </p>
          <Link
            to="/"
            search={{ categories: event.category }}
            data-ocid="event_detail.category_filter_link"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent/10 hover:text-accent transition-smooth"
          >
            <Tag className="w-3.5 h-3.5" />
            {event.category} events
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Router: routes + skeleton
// ============================================================

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {SKELETON_KEYS.map((key) => (
          <div
            key={key}
            className="bg-card border border-border rounded-xl h-52 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

const LazyEventsPage = lazy(() => Promise.resolve({ default: EventsPage }));
const LazyEventDetailPage = lazy(() =>
  Promise.resolve({ default: EventDetailPage }),
);

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: (search: Record<string, unknown>) => ({
    categories:
      typeof search.categories === "string" ? search.categories : undefined,
  }),
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <LazyEventsPage />
    </Suspense>
  ),
});

const eventDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/$eventId",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <LazyEventDetailPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([indexRoute, eventDetailRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ============================================================
// Default export: App
// ============================================================

export default function App() {
  return <RouterProvider router={router} />;
}

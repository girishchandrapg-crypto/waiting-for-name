import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { CategoryFilterPills } from "../components/CategoryFilterPills";
import { EventCard } from "../components/EventCard";
import { useEvents, useFilteredEvents } from "../hooks/useEvents";
import { Category } from "../types";

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

export function EventsPage() {
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

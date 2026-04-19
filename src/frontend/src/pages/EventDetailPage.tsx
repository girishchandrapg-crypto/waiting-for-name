import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin, Tag } from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import { Category } from "../types";

const CATEGORY_BADGE_STYLES: Record<Category, string> = {
  [Category.Music]: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  [Category.Tech]: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  [Category.Food]: "bg-accent/20 text-accent border-accent/30",
};

export function EventDetailPage() {
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
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide mb-4 ${CATEGORY_BADGE_STYLES[event.category]}`}
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

import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import type { Event } from "../types";
import { Category } from "../types";

interface EventCardProps {
  event: Event;
  index: number;
}

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

export function EventCard({ event, index }: EventCardProps) {
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

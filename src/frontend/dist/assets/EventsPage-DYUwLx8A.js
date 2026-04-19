import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, M as MapPin, u as useNavigate, a as useSearch } from "./index-DbIynalG.js";
import { C as Category, a as CalendarDays, u as useEvents, b as useFilteredEvents, S as Skeleton } from "./useEvents-Bm2VlVAf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
const Music = createLucideIcon("music", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
const UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode);
const PILL_CONFIG = [
  {
    category: Category.Music,
    label: "Music",
    icon: Music,
    activeClass: "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/10"
  },
  {
    category: Category.Tech,
    label: "Tech",
    icon: Cpu,
    activeClass: "bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm shadow-blue-500/10"
  },
  {
    category: Category.Food,
    label: "Food",
    icon: UtensilsCrossed,
    activeClass: "bg-accent/20 text-accent border-accent/50 shadow-sm shadow-accent/10"
  }
];
function CategoryFilterPills({
  selected,
  onChange,
  counts
}) {
  const toggle = (cat) => {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  };
  const clearAll = () => onChange([]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2 flex-wrap",
      "data-ocid": "category.filter_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1", children: "Filter:" }),
        PILL_CONFIG.map(({ category, label, icon: Icon, activeClass }) => {
          const isActive = selected.includes(category);
          const count = counts == null ? void 0 : counts[category];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle(category),
              "aria-pressed": isActive,
              "data-ocid": `category.filter_pill.${label.toLowerCase()}`,
              className: `
              inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium
              border transition-smooth cursor-pointer select-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              ${isActive ? activeClass : "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground"}
            `,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 shrink-0" }),
                label,
                count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `
                  ml-0.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1
                  rounded-full text-[10px] font-bold tabular-nums leading-none
                  ${isActive ? "bg-white/20 text-current" : "bg-border text-muted-foreground"}
                `,
                    "data-ocid": `category.count_badge.${label.toLowerCase()}`,
                    children: count
                  }
                )
              ]
            },
            category
          );
        }),
        selected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearAll,
            "data-ocid": "category.clear_button",
            className: "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-transparent hover:border-border hover:text-foreground hover:bg-muted/50 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            children: "Clear all"
          }
        )
      ]
    }
  );
}
const CATEGORY_BADGE_STYLES = {
  [Category.Music]: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  [Category.Tech]: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  [Category.Food]: "bg-accent/20 text-accent border-accent/30"
};
const CATEGORY_DOT = {
  [Category.Music]: "bg-purple-400",
  [Category.Tech]: "bg-blue-400",
  [Category.Food]: "bg-accent"
};
function EventCard({ event, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/events/$eventId",
      params: { eventId: event.id.toString() },
      "data-ocid": `event.item.${index}`,
      className: "group block bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 hover:shadow-lg transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide ${CATEGORY_BADGE_STYLES[event.category]}`,
              "data-ocid": `event.category_badge.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[event.category]}`
                  }
                ),
                event.category
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth font-medium", children: "View →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-card-foreground leading-snug group-hover:text-accent transition-smooth line-clamp-2", children: event.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 flex-1", children: event.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 pt-1 border-t border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5 shrink-0 text-accent/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: event.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0 text-accent/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: event.location })
          ] })
        ] })
      ] })
    }
  );
}
function parseCategories(value) {
  if (!value) return [];
  return value.split(",").filter(
    (v) => Object.values(Category).includes(v)
  );
}
function buildCounts(events) {
  const counts = {
    [Category.Music]: 0,
    [Category.Tech]: 0,
    [Category.Food]: 0
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
  const counts = allEvents ? buildCounts(allEvents) : void 0;
  const handleCategoryChange = (cats) => {
    void navigate({
      to: "/",
      search: cats.length > 0 ? { categories: cats.join(",") } : { categories: void 0 },
      replace: true
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display font-bold text-3xl sm:text-4xl text-foreground",
            "data-ocid": "events.page_title",
            children: "Discover Events"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: "Find Music, Tech, and Food events happening near you." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CategoryFilterPills,
        {
          selected,
          onChange: handleCategoryChange,
          counts
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
          "data-ocid": "events.loading_state",
          children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-5 space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 space-y-2 border-t border-border/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-32" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-40" })
                ] })
              ]
            },
            k
          ))
        }
      ),
      isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "events.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-12 h-12 text-muted-foreground/40 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Could not load events. Please try again." })
          ]
        }
      ),
      !isLoading && !isError && events && events.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "events.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-14 h-14 text-accent/40 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No events found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: selected.length > 0 ? "No events match your selected categories. Try clearing some filters." : "There are no events yet. Check back soon!" }),
            selected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleCategoryChange([]),
                "data-ocid": "events.clear_filters_button",
                className: "mt-4 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-smooth",
                children: "Clear filters"
              }
            )
          ]
        }
      ),
      !isLoading && !isError && events && events.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: events.length }),
          " ",
          events.length === 1 ? "event" : "events",
          " found",
          selected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            " · filtered by ",
            selected.join(", ")
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
            "data-ocid": "events.list",
            children: events.map((event, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              EventCard,
              {
                event,
                index: index + 1
              },
              event.id.toString()
            ))
          }
        )
      ] })
    ] })
  ] });
}
export {
  EventsPage
};

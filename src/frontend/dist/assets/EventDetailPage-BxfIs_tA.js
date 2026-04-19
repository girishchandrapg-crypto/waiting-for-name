import { c as createLucideIcon, b as useParams, j as jsxRuntimeExports, L as Link, M as MapPin } from "./index-DbIynalG.js";
import { u as useEvents, S as Skeleton, a as CalendarDays, C as Category } from "./useEvents-Bm2VlVAf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const CATEGORY_BADGE_STYLES = {
  [Category.Music]: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  [Category.Tech]: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  [Category.Food]: "bg-accent/20 text-accent border-accent/30"
};
function EventDetailPage() {
  const { eventId } = useParams({ strict: false });
  const { data: events, isLoading, isError } = useEvents();
  const event = events == null ? void 0 : events.find((e) => e.id.toString() === eventId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
        "data-ocid": "event_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-2/3 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/3 mb-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" })
          ] })
        ]
      }
    );
  }
  if (isError || !event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center",
        "data-ocid": "event_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-12 h-12 text-muted-foreground/40 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium mb-4", children: isError ? "Could not load event details." : "Event not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              search: { categories: void 0 },
              className: "inline-flex items-center gap-2 text-sm text-accent hover:underline",
              "data-ocid": "event_detail.back_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to events"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", "data-ocid": "event_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        search: { categories: void 0 },
        className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth",
        "data-ocid": "event_detail.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to events"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide mb-4 ${CATEGORY_BADGE_STYLES[event.category]}`,
            "data-ocid": "event_detail.category_badge",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
              event.category
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight mt-3", children: event.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 mb-8 grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5", children: "Date & Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: event.date })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: event.location })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-3", children: "About this event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base", children: event.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Browse more events in this category:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            search: { categories: event.category },
            "data-ocid": "event_detail.category_filter_link",
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent/10 hover:text-accent transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
              event.category,
              " events"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  EventDetailPage
};

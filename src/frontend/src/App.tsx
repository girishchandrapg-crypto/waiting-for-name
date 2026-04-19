import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const EventsPage = lazy(() =>
  import("./pages/EventsPage").then((m) => ({ default: m.EventsPage })),
);
const EventDetailPage = lazy(() =>
  import("./pages/EventDetailPage").then((m) => ({
    default: m.EventDetailPage,
  })),
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
      <EventsPage />
    </Suspense>
  ),
});

const eventDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/$eventId",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <EventDetailPage />
    </Suspense>
  ),
});

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

const routeTree = rootRoute.addChildren([indexRoute, eventDetailRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

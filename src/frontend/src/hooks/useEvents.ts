import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Category } from "../types";

export function useEvents() {
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

export function useFilteredEvents(categories: Category[]) {
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

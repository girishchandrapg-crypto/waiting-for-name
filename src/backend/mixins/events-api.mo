import Types "../types/events";
import EventsLib "../lib/events";
import List "mo:core/List";

mixin (events : List.List<Types.Event>) {
  public query func listEvents() : async [Types.Event] {
    EventsLib.listAll(events)
  };

  public query func filterByCategory(categories : [Types.Category]) : async [Types.Event] {
    EventsLib.filterByCategory(events, categories)
  };
};

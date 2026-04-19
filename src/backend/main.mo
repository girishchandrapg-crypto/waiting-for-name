import Types "types/events";
import EventsLib "lib/events";
import EventsApi "mixins/events-api";
import List "mo:core/List";

actor {
  let events = List.empty<Types.Event>();

  EventsLib.seedSampleEvents(events);

  include EventsApi(events);
};

import Types "../types/events";
import List "mo:core/List";
import Array "mo:core/Array";

module {
  public type Event = Types.Event;
  public type Category = Types.Category;

  public func listAll(events : List.List<Event>) : [Event] {
    events.toArray()
  };

  public func filterByCategory(events : List.List<Event>, categories : [Category]) : [Event] {
    let filtered = events.filter(func(e : Event) : Bool {
      categories.any(func(c : Category) : Bool {
        c == e.category
      })
    });
    filtered.toArray()
  };

  public func seedSampleEvents(events : List.List<Event>) {
    let samples : [Event] = [
      { id = 1; name = "Neon Nights Music Festival"; description = "An electrifying outdoor festival featuring indie, electronic, and pop acts under the stars."; date = "2026-06-14"; location = "Riverside Park, Austin TX"; category = #Music },
      { id = 2; name = "Jazz & Blues Evening"; description = "Intimate concert showcasing local jazz and blues legends in a cozy venue."; date = "2026-07-04"; location = "Blue Note Lounge, Chicago IL"; category = #Music },
      { id = 3; name = "Symphony Under the Stars"; description = "The city orchestra performs beloved classical pieces in an open-air amphitheater."; date = "2026-08-20"; location = "Millennium Park, Chicago IL"; category = #Music },
      { id = 4; name = "AI & Machine Learning Summit"; description = "Industry leaders explore the latest breakthroughs in artificial intelligence and applied ML."; date = "2026-05-30"; location = "Moscone Center, San Francisco CA"; category = #Tech },
      { id = 5; name = "Web3 Developer Conference"; description = "Deep-dive sessions on decentralized apps, smart contracts, and the open internet."; date = "2026-06-22"; location = "Jacob Javits Center, New York NY"; category = #Tech },
      { id = 6; name = "Startup Pitch Night"; description = "Early-stage founders pitch to investors in a fast-paced demo evening with networking."; date = "2026-07-15"; location = "TechHub Cowork, Seattle WA"; category = #Tech },
      { id = 7; name = "Open Source Contributors Meetup"; description = "Casual gathering for open source enthusiasts to collaborate, hack, and share projects."; date = "2026-09-03"; location = "Galvanize, Denver CO"; category = #Tech },
      { id = 8; name = "Farm-to-Table Tasting Night"; description = "Celebrate seasonal ingredients with local chefs presenting a four-course tasting menu."; date = "2026-06-07"; location = "The Green Barn, Portland OR"; category = #Food },
      { id = 9; name = "International Street Food Fair"; description = "Over 40 vendors bring flavors from around the world to one vibrant outdoor market."; date = "2026-07-19"; location = "Waterfront Plaza, Miami FL"; category = #Food },
      { id = 10; name = "Craft Beer & Cheese Festival"; description = "Pair artisan cheeses with award-winning craft beers from regional breweries."; date = "2026-08-09"; location = "Historic Brewery District, Milwaukee WI"; category = #Food },
      { id = 11; name = "Vegan Brunch Pop-Up"; description = "Weekend pop-up brunch featuring creative plant-based dishes and fresh-pressed juices."; date = "2026-09-13"; location = "East Village Courtyard, New York NY"; category = #Food },
      { id = 12; name = "Indie Rock Showcase"; description = "Three stages of up-and-coming indie rock bands competing for a label deal."; date = "2026-10-01"; location = "The Echo, Los Angeles CA"; category = #Music }
    ];
    for (event in samples.vals()) {
      events.add(event);
    };
  };
};

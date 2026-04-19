module {
  public type Category = {
    #Music;
    #Tech;
    #Food;
  };

  public type Event = {
    id : Nat;
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    category : Category;
  };
};

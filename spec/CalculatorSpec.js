describe("Calculator",function() {
  var calculator;
  
  beforeEach(function(){
    calculator = new Calculator();
  });
  it("should set a number of people", function() {
    calculator.people(1);
    expect(calculator.people_count).toEqual(1);
    calculator.people(4);
    expect(calculator.people_count).toEqual(4);
  });
  it("should return markup for each person", function(){
    calculator.people(1);
    calculator.price = 100;
    //5% + 1.2$ * people(1)
    var cost = calculator.flatMarkup();
    expect(cost).toEqual(6.2);

    calculator.people(2);
    //5% + 1.2$ * people(2)
    cost = calculator.flatMarkup();
    expect(cost).toEqual(7.4);

    calculator.people(3);
    //5% + 1.2% * people(3)
    cost = calculator.flatMarkup();
    expect(cost).toEqual(8.6);
  });
  it("should return markup for type", function(){
    // drugs have a 7.5% markup
    var cost = 100 * calculator.setMarkup('drugs');
    expect(cost).toEqual(7.5);
    cost = calculator.additionalMarkup(100,'drugs');
    expect(cost).toEqual(7.5);

    // food have a 13% markup
    cost = 101 * calculator.setMarkup('food');
    expect(cost).toEqual(13.13);
    cost = calculator.additionalMarkup(101,'food');
    expect(cost).toEqual(13.13);

    // electronics have a 2% markup
    cost = 100 * calculator.setMarkup('electronics');
    expect(cost).toEqual(2);
    cost = calculator.additionalMarkup(100,'electronics');
    expect(cost).toEqual(2);

    // other types have a 0% markup
    cost = 101 * calculator.setMarkup('books');
    expect(cost).toEqual(0);
    cost = calculator.additionalMarkup(101,'books');
    expect(cost).toEqual(0);
  });
  it("should return electronics cost on price", function(){
    var electronics_cost=calculator.execute({
      people:3,
      type:'electronics',
      price:1299.99
    });
    expect(electronics_cost).toEqual(1440.03);
  });

  // The following tests are directly from the exercise
  //  NOTE: THEY FAIL!
  //    could it be that the numbers are wrong on the exercise? that would be evil.
  //    it is more likely that it is my magical calculation..
  //    cost = price + flat_markup + additionalMarkup((flat_markup + price),options.type));
  it("should return food cost on price", function(){
    var food_cost=calculator.execute({
      people:3,
      type:'food',
      price:1299.99
    });
    expect(food_cost).toEqual(1591.58);
  });
  it("should return drugs cost on price", function(){
    var drugs_cost=calculator.execute({
      people:1,
      type:'drugs',
      price:5432.00
    });
    expect(drugs_cost).toEqual(6199.81);
  });
  it("should return other cost on price", function(){
    var books_cost=calculator.execute({
      people:4,
      type:'books',
      price:12456.95
    });
    expect(books_cost).toEqual(13707.63);
  });
});

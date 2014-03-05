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

    var flat_markup = calculator.flatMarkup();
    expect(flat_markup).toEqual(111.80);
    
    var markup_price = flat_markup + calculator.price;
    expect(markup_price).toEqual(1411.79);

    var cost = calculator.additionalMarkup(markup_price,'electronics') + markup_price;
    cost = parseFloat(cost.toFixed(2),10);
    expect(cost).toEqual(1440.03);

    expect(cost).toEqual(electronics_cost);
    expect(electronics_cost).toEqual(1440.03);
  });

  it("should calculate the cost for a food item",function(){
    calculator.people(1);
    calculator.price = 100;
    
    var flat_markup = calculator.flatMarkup();
    expect(flat_markup).toEqual(6.20);
    
    var markup_price = flat_markup + calculator.price;
    expect(markup_price).toEqual(106.20);

    var cost = calculator.additionalMarkup(markup_price,'food') + markup_price;
    cost = parseFloat(cost.toFixed(2),10);
    expect(cost).toEqual(120.01);
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

    var flat_markup = calculator.flatMarkup();
    expect(flat_markup).toEqual(111.80);
    // 0.05 + (0.012 * 3) = 0.086
    // 1299.99 * 0.086 = 111.80
    
    var markup_price = flat_markup + calculator.price;
    expect(markup_price).toEqual(1411.79);
    // 111.80 + 1299.99 = 1411.79

    var cost = calculator.additionalMarkup(markup_price,'food') + markup_price;
    cost = parseFloat(cost.toFixed(2),10);
    expect(cost).toEqual(1595.32);
    // (1411.79 * 0.13) + 1411.79 = 1595.32

    expect(cost).toEqual(food_cost);
    expect(food_cost).toEqual(1591.58);  // NOTE: THIS TEST FAILS, value found on exercise
  });
  it("should return drugs cost on price", function(){
    var drugs_cost=calculator.execute({
      people:1,
      type:'drugs',
      price:5432.00
    });

    var flat_markup = calculator.flatMarkup();
    expect(flat_markup).toEqual(336.78);
    
    var markup_price = flat_markup + calculator.price;
    expect(markup_price).toEqual(5768.78);

    var cost = calculator.additionalMarkup(markup_price,'drugs') + markup_price;
    cost = parseFloat(cost.toFixed(2),10);
    expect(cost).toEqual(6201.44);

    expect(cost).toEqual(drugs_cost);
    expect(drugs_cost).toEqual(6199.81);  // NOTE: THIS TEST FAILS, value found on exercise
  });
  it("should return other cost on price", function(){
    var books_cost=calculator.execute({
      people:4,
      type:'books',
      price:12456.95
    });

    var flat_markup = calculator.flatMarkup();
    expect(flat_markup).toEqual(1220.78);
    
    var markup_price = flat_markup + calculator.price;
    expect(parseFloat(markup_price.toFixed(2),10)).toEqual(13677.73);

    var cost = calculator.additionalMarkup(markup_price,'books') + markup_price;
    cost = parseFloat(cost.toFixed(2),10);
    expect(cost).toEqual(13677.73);

    expect(cost).toEqual(books_cost);
    expect(books_cost).toEqual(13707.63);  // NOTE: THIS TEST FAILS, value found on exercise
  });
});

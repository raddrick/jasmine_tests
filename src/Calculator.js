function Calculator() {
  this.price=0;
  this.markup=0;
  this.people_count=0;
}
Calculator.prototype.values = function(options){
  if (options.price) this.price=options.price;
  if (options.people) this.people_count=options.people;
  if (options.markup) this.markup=options.markup;
};
Calculator.prototype.execute = function(options){
  this.values(options);
  console.log(options);
  
  // first perform the flat markup
  // then they type based markup
  var flat_markup = this.flatMarkup();
  var markup_price = flat_markup + this.price;
  var cost = this.additionalMarkup(markup_price,options.type) + markup_price;
  console.log("Additional $: " + this.additionalMarkup(markup_price,options.type));
  console.log("Markup $: " + markup_price);
  console.log("Cost $: " + cost);
  
  return parseFloat(cost.toFixed(2),10);
};
Calculator.prototype.people = function(count){
  if (count)
    this.people_count=count;
   else
    return this.people_count*0.012; //returns the markup for the people needed
};
Calculator.prototype.flatMarkup = function(){
  // add the base 5% flat markup to the people markup
  var markup = 0.05 + this.people();
  var cost = this.price * markup;
  console.log("Markup %: " + markup);
  console.log("Flat Cost: " + cost);

  // return the cost of the markup
  return parseFloat(cost.toFixed(2),10);
  //return cost+this.price;
};
Calculator.prototype.additionalMarkup = function(price,type){
  if (type) this.setMarkup(type);
  price = price * this.markup;
  return parseFloat(price.toFixed(2),10);
  //return price;
};
Calculator.prototype.setMarkup = function(type){
  var markup = 0;
  switch(type){
    case 'food':
      markup += 0.13;
      break;
    case 'drugs':
    case 'pharamaceuticals':
      markup += 0.075;
      break;
    case 'electronics':
      markup += 0.02;
      break;
    default:
      break;
  }
  this.markup = markup;
  return this.markup;
};
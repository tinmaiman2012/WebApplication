var products = [
	{id : 3, name : "Pen", cost : 80, units : 70, category : 1},
	{id : 8, name : "Hen", cost : 40, units : 50, category : 2},
	{id : 7, name : "Zen", cost : 60, units : 90, category : 1},
	{id : 4, name : "Ten", cost : 50, units : 30, category : 2},
	{id : 6, name : "Den", cost : 30, units : 50, category : 1},
	{id : 2, name : "Ken", cost : 90, units : 60, category : 2}
];

var categories = [
	{id : 1, name : "grocery"},
	{id : 2, name : "stationary"}
];

var sort = function(list){
	for(var i=0;i<list.length-1;i++)
		for(var j=i+1;j<list.length;j++)
			if (list[i].id > list[j].id){
				var temp = list[i];
				list[i] = list[j];
				list[j] = temp;
			}
}

console.log("Initial list");
console.table(products);

console.log("After default sorting")
sort(products);
console.table(products);

var sort = function(list, attrName){
	for(var i=0;i<list.length-1;i++)
		for(var j=i+1;j<list.length;j++)
			if (list[i][attrName] > list[j][attrName]){
				var temp = list[i];
				list[i] = list[j];
				list[j] = temp;
			}
}


console.log("After sorting by cost")
sort(products, "cost");
console.table(products);

console.log("After sorting by units")
sort(products, "units");
console.table(products);

var sort = function(list, comparerFn){
	for(var i=0;i<list.length-1;i++)
		for(var j=i+1;j<list.length;j++)
			if (comparerFn(list[i], list[j]) > 0){
				var temp = list[i];
				list[i] = list[j];
				list[j] = temp;
			}
}

var productComparerByValue = function(p1,p2){
	var p1Value = p1.units * p1.cost,
		p2Value = p2.units * p2.cost;
	if (p1Value < p2Value) return -1;
	if (p1Value === p2Value) return 0;
	return 1;
}

console.log("After sorting by value")
sort(products, productComparerByValue);
console.table(products);

var filter = function(){
	var result = [];
	for(var i=0;i<products.length;i++){
		if (products[i].cost > 50)
			result.push(products[i]);
	}
	return result;
}

var costlyProducts = filter();
console.log("costly products [ cost  > 50 ]");
console.table(costlyProducts);

var filter = function(list, criteriaFn){
	var result = [];
	for(var i=0;i<list.length;i++){
		if (criteriaFn(list[i]))
			result.push(list[i]);
	}
	return result;
}

var costlyProductCriteria = function(product){
	return product.cost > 50;
}

var costlyProducts = filter(products,costlyProductCriteria);
console.table(costlyProducts);

var affordableProductCriteria = function(product){
	return product.cost <= 50;
}

var affordableProducts = filter(products,affordableProductCriteria);
console.log("Affordable Products")
console.table(affordableProducts);

var inverseCriteria = function(criteriaFn){
	return function(){
		return !criteriaFn.apply(this, arguments);
	}
}

var affordableProductCriteria = inverseCriteria(costlyProductCriteria);

var affordableProducts = filter(products,affordableProductCriteria);
console.log("Affordable Products")
console.table(affordableProducts);

//sum
//avg
//min
//max
//any
//all

var memoize = function(fn){
	var cache = {};
	return function(){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] !== "undefined"){
			console.log("from cache..");
			return cache[key];
		}
		cache[key] = fn.apply(this, arguments);
		console.log("Juz processd..");
		return cache[key];
	}
}

var memoize = function(fn){
	var cache = {};
	return function(){
		var key = JSON.stringify(arguments);
		cache[key] = cache.hasOwnProperty(key) ? cache[key] : fn.apply(this,arguments);
		return cache[key];
	}
}

var memoize = function(fn, keySelector){
	var cache = {};
	return function(){
		var key = keySelector(arguments);
		cache[key] = cache.hasOwnProperty(key) ? cache[key] : fn.apply(this,arguments);
		return cache[key];
	}
}





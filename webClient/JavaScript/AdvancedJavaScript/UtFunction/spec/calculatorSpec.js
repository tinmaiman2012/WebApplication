describe("A Calculator", function(){
	it("Should be able to add 2 numbers", function(){
		//Arrange
		var number1 = 10,
			number2 = 20,
			expectedResult = 30;

		//Act
		var result = add(number1, number2);

		//Assert
		expect(result).toBe(expectedResult);
	});

	it("Should be able to add 2 numbers in string format", function(){
		//Arrange
		var number1 = "10",
			number2 = "20",
			expectedResult = 30;

		//Act
		var result = add(number1, number2);

		//Assert
		expect(result).toBe(expectedResult);
	});

	it("Should ignore non numeric strings", function(){
		//Arrange
		var number1 = "10",
			number2 = "abc",
			expectedResult = 10;

		//Act
		var result = add(number1, number2);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to add 2 functions returning numbers", function(){
		var f1 = function(){ return 10;},
			f2 = function(){ return 20;},
			expectedResult = 30;

		var result = add(f1,f2);

		expect(result).toBe(expectedResult);
	});
	it("Should be able to add 2 functions returning numbers in string format", function(){
		var f1 = function(){ return "10";},
			f2 = function(){ return "20";},
			expectedResult = 30;

		var result = add(f1,f2);

		expect(result).toBe(expectedResult);
	});
	it("Should return zero when no numbers are added", function(){
		var expectedResult = 0;

		var result = add();

		expect(result).toBe(expectedResult);
	});
	it("Should be able to add varying number of numbers", function(){
		var expectedResult = 100;
		
		var result = add(10,20,30,40);

		expect(result).toBe(expectedResult);
	});
	it("Should be able to add arrays of numbers", function(){
		var numbers1 = [10,20],
			numbers2 = [30,40],
			expectedResult = 100;

		var result = add(numbers1, numbers2);

		expect(result).toBe(expectedResult);
	});
	it("Should be able to add arrays of numbers in string format", function(){
		var numbers1 = ["10","20"],
			numbers2 = [30,40],
			expectedResult = 100;

		var result = add(numbers1, numbers2);

		expect(result).toBe(expectedResult);
	});
	it("Should be able to add functions returning arrays of numbers and numbers in string format", function(){
		var f1 = function(){ return [10,"20"];},
			f2 = function(){ return [30,"40"];},
			expectedResult = 100;

		var result = add(f1,f2);

		expect(result).toBe(expectedResult);
	});
	it("Should be able to add a nested array of numbers", function(){
		var numbers = [10,[20,[30,[40,50]]]];
		var expectedResult = 150;

		var result = add(numbers);

		expect(result).toBe(expectedResult);
	});
	it("Should be able to add array of functions returning arrays of numbers and numbers in string format", function(){
		var f1 = function(){ return [10,"20"];},
			f2 = function(){ return [30,"40"];},
			fns = [f1,f2],
			expectedResult = 100;

		var result = add(fns);

		expect(result).toBe(expectedResult);
	});
});
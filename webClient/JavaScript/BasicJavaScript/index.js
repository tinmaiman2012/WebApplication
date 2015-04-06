/*


=======================Type of variables in javaScript=============;

Examples
Normal cases

// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // Despite being "Not-A-Number"
typeof Number(1) === 'number'; // but never use this form!


// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof always return a string
typeof String("abc") === 'string'; // but never use this form!


// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // but never use this form!


// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'


// Undefined
typeof undefined === 'undefined';
typeof blabla === 'undefined'; // an undefined variable


// Objects
typeof {a:1} === 'object';

// use Array.isArray or Object.prototype.toString.call
// to differentiate regular objects from arrays
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';


// The following is confusing. Don't use!
typeof new Boolean(true) === 'object'; 
typeof new Number(1) === 'object'; 
typeof new String("abc") === 'object';


// Functions
typeof function(){} === 'function';
typeof Math.sin === 'function';



=======================comparation of two type (String and Number)========================================


var a = '1';
undefined
if(a == '1')console.log(true);else console.log(false)
VM607:2 true
undefined
if(a === '1')console.log(true);else console.log(false)
VM608:2 true
undefined
if(a == 1)console.log(true);else console.log(false)
VM609:2 true
undefined
if(a === 1)console.log(true);else console.log(false)
VM610:2 false
	function Person(){return "person";}

	var p = new Person()

	p instanceof Person
	true
	p instanceof Function
	false
	typeof(p)
	"object"
	typeof(Person)
	"function"
	Person instanceof Function
	true

============================Object and Function=========================================;


var a = function(){}
undefined
a instanceof Function
true
a instanceof Object
true
typeof(a)
"function"
var b = {};
undefined
typeof(b)
"object"
b instanceof Object
true

=========================Object and Array===============================================;

typeof []
"object"
[] instanceof Array
true
[] instanceof Object
true
var a = {};
undefined
typeof(a)
"object"
a instanceof Object
true
a instanceof Array
false

========================context of function=============================================;
 function test(){

 	var seft = this;
 	console.log(seft);

 	function contextFun(){

 		seft.a = "Hello";
 		seft.b = "World";
 		console.log(seft.a + ' ' + seft.b + ' ' + seft.c);
 	}

 	console.log("==============Default===========");
 	contextFun();

 	console.log("==============seft is test==");
 	seft.c = "I am javaScript";
 	contextFun();
	

 };
 test();

var c = "this is windows";
test();

function wrap(){
	var seft = this;
	this.c ="this is wrap function";
	test();

}

=====================Apply and call=======================================================;
function test(a,b){
	
	console.log(this.a);
	console.log(a,b);
	
}

test.apply({a:'result of a and b is: '},[1,2])
test.call({a:'result of a and b is: '},1,2)

======================Prototype ============================================================
function person(name,age){this.name = name; this.age =age;}

var p = new person('dat',24)

p.age

p.name

person.prototype.description ='Single'

p.description

person.prototype.descriptionF =function(){return 'Single';};

p.descriptionF()

*/






(function(){
	function init(){
		var btnClick = document.getElementById('btnClick');	


		btnClick.addEventListener('click',function(e){

			e.preventDefault();
			var description  = document.getElementsByClassName('description')[0];
			var valueDescription = description;

			var name  = document.getElementById('name').value;
			document.getElementById('result').innerHTML = '<p>'+name+'</p>' ;

		})

	}

	window.addEventListener('DOMContentLoaded',init)
})();

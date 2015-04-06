function add(a,b,c){
	function parseArg(n){
		if (n instanceof Array) return add.apply(this, n);
		if (typeof n === "function") return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n,10);
	}
	return arguments.length <= 1 ? parseArg(arguments[0]) 
		: parseArg(arguments[0]) + add([].slice.call(arguments,1));
}
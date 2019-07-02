export function FunctionLiteral (Function :{ (...args :any[]) :any } | { new (...args :any[]) :any }) :string {
	var literal :string = ''+Function;
	
	return literal;
}
// (async)(method|function(name)|=>)(*) get set class(name)

declare module '.Array' { export default Array; }
declare module '.Array.isArray?=' { export default isArray;
	function isArray (value :any) :value is any[] | Readonly<any[]>;
}
declare module '.Array.prototype' { export default Array.prototype; }

declare module '.Date.prototype.valueOf' { export default Date.prototype.valueOf; }

declare module '.Error?=' { export default Error; }

declare module '.Infinity' { export default Infinity; }

declare module '.Map.prototype.has?' { export default Map.prototype.has; }

declare module '.Math.floor' { export default Math.floor; }

declare module '.Object' { export default O;
	type O = Object;
	const O :typeof Object & {
		<T extends object> (value :T) :T;
		(value? :undefined | null) :object;
		(value :boolean) :Boolean & object;
		(value :number) :Number & object;
		(value :string) :String & object;
		(value :symbol) :Symbol & object;
		(value :bigint) :BigInt & object;
		new<T extends object> (value :T) :T;
		new (value? :undefined | null) :object;
		new (value :boolean) :Boolean & object;
		new (value :number) :Number & object;
		new (value :string) :String & object;
		new (value :symbol) :Symbol & object;
		new (value :bigint) :BigInt & object;
	};
}
declare module '.Object.create?=' { export default create;
	function create (proto :null) :object;
	function create<P extends object> (proto :P) :object & { [K in keyof P] :P[K] };
}
declare module '.Object.prototype' { export default Object.prototype; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype.test' { export default RegExp.prototype.test; }

declare module '.Set.prototype.has?' { export default Set.prototype.has; }

declare module '.String.fromCharCode' { export default String.fromCharCode; }

declare module '.Symbol.species?' { export default Symbol.species; }
declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.class.isDate' { export default isDate;
	function isDate (value :any) :value is Date;
}
declare module '.class.isMap' { export default isMap;
	function isMap (value :any) :value is Map;
}
declare module '.class.isRegExp' { export default isRegExp;
	function isRegExp (value :any) :value is RegExp;
}
declare module '.class.isSet' { export default isSet;
	function isSet (value :any) :value is Set;
}

declare module '.default?=' { export default Default;
	function Default<Exports extends Readonly<{ [key :string] :any, default? :Module<Exports> }>> (exports :Exports) :Module<Exports>;
	function Default<Statics extends Readonly<{ [key :string] :any, default? :ModuleFunction<Statics, Main> }>, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports & { default :Module<Exports> }>;
	type ModuleFunction<Statics, Main> = Readonly<Statics & { default :ModuleFunction<Statics, Main> }> & Main;
	type Callable = (...args :any) => any;
	type Newable = { new (...args :any) :any };
}

declare module '.native' { export default _; const _ :never; }

declare module '.throw.Error' { export default throwError;
	function throwError (message? :string) :never;
}

declare module '.undefined' { export default undefined; }

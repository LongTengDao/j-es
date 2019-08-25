export as namespace ES;
export = EXPORTS;
declare const EXPORTS :{
	
	version :'0.10.3';
	
	isReservedWord (name :string, noStrict? :boolean) :boolean;
	
	isIdentifierName (name :string, ES? :number, noStrict? :boolean) :boolean;
	isIdentifier (id :string, ES? :number) :boolean;
	isArrayIndex (key :string) :boolean;
	isIntegerIndex (key :string) :boolean;
	isPropertyName (key :string, ES? :number) :boolean;
	PropertyName (key :string, ES? :number) :string;
	PropertyAccessor (key :string, ES? :number) :string;
	PropertyAccessors (keys :string[], ES? :number) :string;
	
	StringLiteral (string :string) :string;
	NumericLiteral (number :number) :string;
	BigIntLiteral (bigInt :bigint) :string;
	RegularExpressionLiteral (regExp :RegExp) :string;
	
	ObjectLiteral<Object extends object, Options extends {
		ES? :number,
		open_close? :string,
		open_first? :string,
		key_colon? :string,
		colon_value? :string,
		value_comma? :string,
		comma_next? :string,
		last_close? :string,
		__proto__? :boolean,
		undefined? :string,
		Infinity? :string,
		NaN? :string,
	} & {
		[methodName in keyof TypeMethods]? :(
			this :Options,
			value :TypeMethods[methodName] & Object[keyof Object],
			key :keyof Object,
			object :Object,
		) => string
	}> (object :Object, options :Options) :string;
	ArrayLiteral<Array extends Readonly<any[]>, Options extends {
		open_close? :string,
		open_first? :string,
		item_comma? :string,
		comma_next? :string,
		last_close? :string,
		undefined? :string,
		Infinity? :string,
		NaN? :string,
	} & {
		[methodName in keyof TypeMethods]? :(
			this :Options,
			value :TypeMethods[methodName] & Array[number],
			index :number,
			array :Array,
		) => string
	}> (array :Array, options :Options) :string;
	
	exportify<Value, Options extends {
		ES? :number,
		let? :'var' | 'const' | 'let',
		identifier_equal? :string,
		key_equal? :string,
		equal_value? :string,
		open_close? :string,
		open_first? :string,
		key_colon? :string,
		colon_value? :string,
		value_comma? :string,
		comma_next? :string,
		last_close? :string,
		value_semicolon? :string,
		semicolon_next? :string,
		default_value? :string,
		__safe__? :boolean,
		undefined? :string,
		Infinity? :string,
		NaN? :string,
	} & ( Value extends object
		? { [methodName in keyof TypeMethods]? :(this :Options, value :TypeMethods[methodName] & Value[keyof Value], key :keyof Value, object :Value) => string }
		: { [methodName in keyof TypeMethods]? :(this :Options, value :TypeMethods[methodName], key :any, object :any) => string }
		)> (object :Value, options :Options) :string;
	
	default :typeof EXPORTS;
	
};

type TypeMethods = {
	bigint :bigint
	symbol :symbol
	Array :any[]
	Map :Map<any, any>
	Set :Set<any>
	Date :Date
	RegExp :RegExp
	object :object
	function :{ (this :any, ...args :any) :any, new (...args :any) :any } | { (this :any, ...args :any) :any } | { new (...args :any) :any }
	unknown :unknown
};

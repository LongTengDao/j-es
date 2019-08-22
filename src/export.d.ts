export const version :string;

export function isReservedWord (name :string, noStrict? :boolean) :boolean;

export function isIdentifierName (name :string, ES? :number, noStrict? :boolean) :boolean;
export function isIdentifier (id :string, ES? :number) :boolean;
export function isArrayIndex (key :string) :boolean;
export function isIntegerIndex (key :string) :boolean;
export function isPropertyName (key :string, ES? :number) :boolean;
export function PropertyName (key :string, ES? :number) :string;
export function PropertyAccessor (key :string, ES? :number) :string;
export function PropertyAccessors (keys :string[], ES? :number) :string;

export function StringLiteral (string :string) :string;
export function NumericLiteral (number :number) :string;
export function BigIntLiteral (bigInt :bigint) :string;
export function RegularExpressionLiteral (regExp :RegExp) :string;

export function ObjectLiteral<Object extends object, Options extends {
	ES? :number,
	open_close? :string,
	open_first? :string,
	key_colon? :string,
	colon_value? :string,
	value_comma? :string,
	comma_next? :string,
	last_close? :string,
	__safe__? :boolean,
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
export function ArrayLiteral<Array extends Readonly<any[]>, Options extends {
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

export function exportify<Value, Options extends {
	ES? :number,
	let? :'var' | 'const' | 'let',
	identifier_equal? :string,
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
	default_open? :string,
	__safe__? :boolean,
	undefined? :string,
	Infinity? :string,
	NaN? :string,
} & ( Value extends object
	? { [methodName in keyof TypeMethods]? :(this :Options, value :TypeMethods[methodName] & Value[keyof Value], key :keyof Value, object :Value) => string }
	: { [methodName in keyof TypeMethods]? :(this :Options, value :TypeMethods[methodName]) => string }
	)> (object :Value, options :Options) :string;

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

export default DEFAULT;
declare const DEFAULT :{
	
	version :typeof version
	
	isReservedWord :typeof isReservedWord
	
	isIdentifierName :typeof isIdentifierName
	isIdentifier :typeof isIdentifier
	isArrayIndex :typeof isArrayIndex
	isIntegerIndex :typeof isIntegerIndex
	isPropertyName :typeof isPropertyName
	PropertyName :typeof PropertyName
	PropertyAccessor :typeof PropertyAccessor
	PropertyAccessors :typeof PropertyAccessors
	
	StringLiteral :typeof StringLiteral
	NumericLiteral :typeof NumericLiteral
	BigIntLiteral :typeof BigIntLiteral
	RegularExpressionLiteral :typeof RegularExpressionLiteral
	
	ObjectLiteral :typeof ObjectLiteral
	ArrayLiteral :typeof ArrayLiteral
	
	exportify :typeof exportify
	
	default :typeof DEFAULT
	
};

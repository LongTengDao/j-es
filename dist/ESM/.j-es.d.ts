export const version :'0.8.1';

export function isReservedWord (name :string, ES? :number) :boolean;

export function isIdentifierName (name :string, ES? :number) :boolean;
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

export function ObjectLiteral<Value extends any> (
	object :{ [key :string] :Value },
	ValueLiteral :(value :Value) => string,
	options? :{
		ES? :number,
		open_close? :string,
		open_first? :string,
		colon_value? :string,
		comma_next? :string,
		last_close? :string,
		defineProperty? :string,
	}
) :string;
export function ArrayLiteral<Item extends any> (
	array :Item[],
	ItemLiteral :(item :Item) => string,
	options? :{
		open_close? :string,
		open_first? :string,
		comma_next? :string,
		last_close? :string,
	}
) :string;

export function exportify<Value extends any> (
	object :{ [key :string] :Value },
	IdentifierValueLiteral :(value :Value) => string,
	PropertyValueLiteral :(value :Value) => string,
	options? :{
		ES? :number,
		let? :string,
		identifier_equal? :string,
		equal_value? :string,
		open_close? :string,
		open_first? :string,
		colon_value? :string,
		comma_next? :string,
		last_close? :string,
		semicolon_next? :string,
		default_open? :string,
		defineProperty? :string,
	}
) :string;

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

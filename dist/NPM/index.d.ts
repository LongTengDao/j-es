export = EXPORTS;
declare const EXPORTS :{
	
	version :'0.8.1'
	
	isReservedWord (name :string, ES? :number) :boolean;
	
	isIdentifierName (name :string, ES? :number) :boolean;
	isIdentifier (id :string, ES? :number) :boolean;
	isArrayIndex (key :string) :boolean;
	isIntegerIndex (key :string) :boolean;
	isPropertyName (key :string, ES? :number) :boolean;
	PropertyName (key :string, ES? :number) :string;
	PropertyAccessor (key :string, ES? :number) :string;
	PropertyAccessors (keys :string[], ES? :number) :string;
	
	StringLiteral (string :string) :string
	NumericLiteral (number :number) :string
	BigIntLiteral (bigInt :bigint) :string
	RegularExpressionLiteral (regExp :RegExp) :string
	
	ObjectLiteral<Value extends any> (
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
	) :string
	ArrayLiteral<Item extends any> (
		array :Item[],
		ItemLiteral :(item :Item) => string,
		options? :{
			open_close? :string,
			open_first? :string,
			comma_next? :string,
			last_close? :string,
		}
	) :string
	
	exportify<Value extends any> (
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
	) :string
	
	default :typeof EXPORTS
	
};
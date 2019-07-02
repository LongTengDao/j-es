import { Cf } from 'lib:unicode';

export function NullLiteral () :'null' {
	return 'null';
}

export function BooleanLiteral (boolean :boolean) :'true' | 'false' {
	return boolean ? 'true' : 'false';
}

export function NumericLiteral (number :number) :string {
	return ( number===0 && 1/number<0 ? '-' : '' )+number;
}

var CANT_IN_SINGLE_QUOTE = /[\n\r'\\\u2028\u2029]/g;
function staticallyEscape (cant_in_single_quote :keyof typeof CHAR_TO_ESCAPED) :string {
	return CHAR_TO_ESCAPED[cant_in_single_quote];
}

var CHAR_TO_ESCAPED = { '\n': '\\n', '\r': '\\r', '\'': '\\\'', '\\': '\\\\', '\u2028': '\\u2028', '\u2029': '\\u2029' };
function dynamicallyEscape (char_in_cf :string) :string {
	if ( char_in_cf.length>1 ) {
		return dynamicallyEscape(char_in_cf.charAt(0))+dynamicallyEscape(char_in_cf.charAt(1));
	}
	var hex :string = char_in_cf.charCodeAt(0).toString(16).toUpperCase();
	switch ( hex.length ) {
		case 4:
			return '\\u'+hex;
		case 3:
			return '\\u0'+hex;
		case 2:
			return '\\x'+hex;
	}
	return '\\x0'+hex;
}

type Replacer = (...args :any[]) => string;

export function StringLiteral (string :string) :string {
	return '\''
		+string
		.replace(CANT_IN_SINGLE_QUOTE, staticallyEscape as Replacer)
		.replace(Cf, dynamicallyEscape as Replacer)
		+'\'';
}

var U_FLAG = /uy?$/;

export function RegularExpressionLiteral (regExp :RegExp) :string {
	var literal :string = ''+regExp;
	return U_FLAG.test(literal)
		? literal
		: literal.replace(Cf, dynamicallyEscape as Replacer);
}

export function BigIntLiteral (bigInt :bigint) :string {
	return bigInt+'n';
}

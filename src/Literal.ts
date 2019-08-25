import RegExp from '.RegExp';
import Infinity from '.Infinity';
import Object from '.Object';
import throwError from '.throw.Error';

import { Cf } from 'lib:unicode';

export var _Infinity = -Infinity;

export function NullLiteral () :'null' {
	return 'null';
}

export function BooleanLiteral (value :boolean) :'true' | 'false' {
	return value ? 'true' : 'false';
}

export var is :(value :number, positive_zero :-0) => boolean = Object.is || function is (value :number) { return value===0 && 1/value<0; };
export function NumericLiteral (value :number) :string {
	return value===Infinity || value===_Infinity || value!==value
		? /*#__PURE__*/ throwError('NumericLiteral('+value+')')
		: ( is(value, -0) ? '-' : '' )+value;
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

export function StringLiteral (value :string) :string {
	return '\''
		+value
		.replace(CANT_IN_SINGLE_QUOTE, staticallyEscape as Replacer)
		.replace(Cf, dynamicallyEscape as Replacer)
		+'\'';
}

var EOL = /\\[^\s\S]|[\n\r\/\u2028\u2029]/g;
function EOL_replacer (part :string) {
	switch ( part ) {
		case '\n':
		case '\\\n':
			return '\\n';
		case '\r':
		case '\\\r':
			return '\\r';
		case '/':
			return '\\/';
		case '\u2028':
		case '\\\u2028':
			return '\\u2028';
		case '\u2029':
		case '\\\u2029':
			return '\\u2029';
	}
	return part;
}
var AS_ES5 = ''+RegExp('')==='//' || ''+RegExp('/')==='///' || ''+RegExp('\n')==='/\n/'
	? function AS_ES5 (literal :string) {
		var index :number = literal.length;
		while ( literal.charAt(--index)!=='/' ) { }
		var source :string = literal.slice(1, index);
		source = source ? source.replace(EOL, EOL_replacer) : '(?:)';
		return '/'+source+literal.slice(index);
	}
	: function (literal :string) { return literal; };
var MAYBE_ES3 = /\/[gim]*$/;
var SLASH_NUL = /(?!^)\/(?![a-z]*$)|\x00|\\[\s\S]/g;
function SLASH_NUL_replacer (part :string) { return part==='\x00' ? '\\x00' : part==='/' ? '\\/' : part; }
export function RegularExpressionLiteral (value :RegExp) :string {
	var literal :string = AS_ES5(''+value);
	return MAYBE_ES3.test(literal)
		? literal.replace(Cf, dynamicallyEscape as Replacer).replace(SLASH_NUL, SLASH_NUL_replacer)
		: literal;
}

export function BigIntLiteral (value :bigint) :string {
	return value+'n';
}

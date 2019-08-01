var LIKE_SAFE_INTEGER = /^(?:0|[1-9]\d{0,15})$/;
var LIKE_ARRAY_INDEX = /^(?:0|[1-4]\d{0,9}|[5-9]\d{0,8})$/;
export function isArrayIndex (key :string) :boolean {
	return LIKE_ARRAY_INDEX.test(key) && key as any<4294967295;
}
export function isIntegerIndex (key :string) :boolean {
	return LIKE_SAFE_INTEGER.test(key) && key as any<=9007199254740991;
}

import { RESERVED_WORD_ES3, RESERVED_WORD_ESM } from 'lib:reserved-word';
export function isReservedWord (name :string, ES? :number) :boolean {
	return ES!<0
		? RESERVED_WORD_ES3.test(name)
		: RESERVED_WORD_ESM.test(name);
}

import { IDENTIFIER_NAME_ES6, IDENTIFIER_NAME_ES3, IDENTIFIER_NAME_ES5 } from 'lib:unicode';
export function isIdentifierName (name :string, ES? :number) :boolean {
	if ( ES ) {
		if ( ES>=6 ) { return IDENTIFIER_NAME_ES6.test(name); }
		if ( ES>=5 ) { return IDENTIFIER_NAME_ES5.test(name); }
	}
	return IDENTIFIER_NAME_ES3.test(name);
}
export function isIdentifier (id :string, ES? :number) :boolean {
	return isIdentifierName(id, ES!<0 ? -ES! : ES) && !isReservedWord(id, ES);
}
export function isPropertyName (key :string, ES? :number) :boolean {
	return isIdentifierName(key, ES)
		? ES!>=5 || !RESERVED_WORD_ES3.test(key)
		: isIntegerIndex(key);
}

import { StringLiteral } from './Literal';
export function PropertyName (key :string, ES? :number) :string {
	return isPropertyName(key, ES) ? key : StringLiteral(key);// ['__proto__']
}
export function PropertyAccessor (key :string, ES? :number) :string {
	if ( isIdentifierName(key, ES) ) { if ( ES!>=5 || !RESERVED_WORD_ES3.test(key) ) { return '.'+key; } }
	else { if ( isIntegerIndex(key) ) { return '['+key+']'; } }
	return '['+StringLiteral(key)+']';
}
export function PropertyAccessors (keys :string[], ES? :number) :string {
	var propertyAccessors :string = '';
	for ( var length = keys.length, index = 0; index<length; ++index ) {
		propertyAccessors += PropertyAccessor(keys[index], ES);
	}
	return propertyAccessors;
}

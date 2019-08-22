import Infinity from '.Infinity';
import undefined from '.undefined';
import isArray from '.Array.isArray?=';
import isDate from '.class.isDate';
import isRegExp from '.class.isRegExp';
import isMap from '.class.isMap';
import isSet from '.class.isSet';

import { StringLiteral, _Infinity, is } from './Literal';

export default function Primitive<Object extends { [key :string] :any },
	Options extends {
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
	}> (
	value :Object[keyof Object],
	key :keyof Object,
	object :Object,
	options :Options
) :string {
	switch ( value ) {
		case null:
			return 'null';
		case true:
			return 'true';
		case false:
			return 'false';
		case undefined:
			return options.undefined || '';
		case Infinity:
			return options.Infinity || '';
		case _Infinity:
			return options.Infinity ? '-'+options.Infinity : '';
	}
	if ( value!==value ) { return options.NaN || ''; }
	switch ( typeof value ) {
		case 'number':
			return ( is(value, -0) ? '-' : '' )+value;
		case 'string':
			return StringLiteral(value);
		case 'bigint':
			return options.bigint ? options.bigint(value, key, object) : '';
		case 'object':
			return (
				options.Array && isArray(value) ? options.Array(value, key, object) :
					options.Map && isMap(value) ? options.Map(value, key, object) :
						options.Set && isSet(value) ? options.Set(value, key, object) :
							options.Date && isDate(value) ? options.Date(value, key, object) :
								options.RegExp && isRegExp(value) ? options.RegExp(value, key, object) :
									options.object ? options.object(value, key, object) : ''
			);
		case 'function':
			return options['function'] ? options['function'](value, key, object) : '';
		case 'symbol':
			return options.symbol ? options.symbol(value, key, object) : '';
	}
	return options.unknown ? options.unknown(value, key, object) : '';
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

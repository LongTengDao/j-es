import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import undefined from '.undefined';
import isArray from '.Array.isArray?=';
import isMap from '.class.isMap';
import isSet from '.class.isSet';
import isDate from '.class.isDate';
import isRegExp from '.class.isRegExp';

import { isIdentifier, PropertyName } from './Name';
import Primitive from './Primitive';

var SAFE = /^[`~!@#%^&*()\-=+[{\]}\\|;:'",<.>\/?\s]/;

export default function exportify (
	object :any,
	options :{
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
		default_value? :string,
		__safe__? :boolean,
	}
) :string {
	if ( typeof object!=='object' || object===null || isArray(object) || isMap(object) || isSet(object) || isDate(object) || isRegExp(object) ) {
		var $default$ = Primitive(object, undefined as any, undefined as any, options as {});
		if ( $default$ ) {
			$default$ = ( options.default_value || '' )+$default$;
			return 'export default'+( SAFE.test($default$) ? '' : ' ' )+( options.value_semicolon || '' )+';';
		}
		return '';
	}
	var ES :number = options.ES || 0;
	var gteES6 :boolean = ES>=6;
	var export_$_ = 'export '+( options.let || ( gteES6 ? 'const' : 'var' ) )+' ';
	var _equal_ :string = ( options.identifier_equal || '' )+'='+( options.equal_value || '' );
	var _colon_ :string = ( options.key_colon || '' )+':'+( options.colon_value || '' );
	var semicolon_ :string = ( options.value_semicolon || '' )+';'+( options.semicolon_next || '' );
	var named :string = '';
	var pairs :string[] = [];
	var open :string = '{';
	var close :string = '}';
	for ( var key in object ) {
		if ( hasOwnProperty.call(object, key) ) {
			var value = Primitive(object[key], key, object, options as {});
			if ( value ) {
				if ( isIdentifier(key, ES) ) {
					named += export_$_+key+_equal_+value+semicolon_;
					if ( gteES6 ) { pairs.push(key); }
					else if ( key==='__proto__' && !options.__safe__ ) {
						open = '/*#__PURE__*/function(o){o.__proto__=__proto__;return o}({';
						close = '})';
						pairs.push('__proto__'+_colon_+'null');
					}
					else { pairs.push(key+_colon_+key); }
				}
				else { pairs.push(PropertyName(key, ES)+_colon_+value); }
			}
		}
	}
	return named+
		'export default'+( options.default_value || '' )+open+(
			pairs.length
				? ( options.open_first || '' )+pairs.join(( options.value_comma || '' )+','+( options.comma_next || '' ))+( options.last_close || '' )
				: ( options.open_close || '' )
		)+close+';';
};

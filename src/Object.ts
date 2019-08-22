import hasOwnProperty from '.Object.prototype.hasOwnProperty';

import { PropertyName } from './Name';
import Primitive from './Primitive';

export function ObjectLiteral (object :{ [key :string] :any }, options :{
	ES? :number,
	open_close? :string,//  s | nT  | nT  | nT
	open_first? :string,//  s | nTt | nTt | nTt
	key_colon? :string
	colon_value? :string,// s | s   | s   | nTtt
	value_comma? :string,
	comma_next? :string,//  s | nTt | nTt | nTt
	last_close? :string,//  s | s   | $nT | $nT
	__safe__? :boolean,
}) :string {
	var pairs :string[] = [];
	var open :string = '{';
	var close :string = '}';
	var _colon_ :string = ( options.key_colon || '' )+':'+( options.colon_value || '' );
	var ES :number = options.ES || 0;
	for ( var key in object ) {
		if ( hasOwnProperty.call(object, key) ) {
			var value = Primitive(object[key as keyof Object], key, object, options as {});
			if ( value ) {
				if ( key==='__proto__' && !options.__safe__ ) {
					if ( ES>=6 ) { key = '[\'__proto__\']' as any; }
					else {
						open = '/*#__PURE__*/function(p,o){o.__proto__=_.p;return o}({'+( options.open_first || '' )+'p'+_colon_+value+( options.last_close || '' )+'},{';
						close = '})';
						value = 'null';
					}
				}
				else { key = PropertyName(key, ES) as any; }
				pairs.push(key+_colon_+value);
			}
		}
	}
	return open+(
		pairs.length
			? ( options.open_first || '' )+pairs.join(( options.value_comma || '' )+','+( options.comma_next || '' ))+( options.last_close || '' )
			: ( options.open_close || '' )
	)+close;
}

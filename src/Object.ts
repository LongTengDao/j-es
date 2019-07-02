import hasOwnProperty from '.Object.prototype.hasOwnProperty';

import { PropertyName } from './Name';

export function ObjectLiteral<Value extends any> (
	object :{ [key :string] :Value },
	ValueLiteral :(value :Value) => string,
	options? :{
		ES? :number,
		open_close? :string,//  s | nT  | nT  | nT
		open_first? :string,//  s | nTt | nTt | nTt
		colon_value? :string,// s | s   | s   | nTtt
		comma_next? :string,//  s | nTt | nTt | nTt
		last_close? :string,//  s | s   | $nT | $nT
		defineProperty? :string,
	}
) :string {
	if ( options ) {
		var ES :number = options.ES || 0;
		var gteES5 :boolean = options.ES!>=5;
		var open_close :string = options.open_close || '';
		var open_first :string = options.open_first || '';
		var colon_value :string = options.colon_value || '';
		var comma_next :string = options.comma_next || '';
		var last_close :string = options.last_close || '';
		var defineProperty :string = options.defineProperty || 'Object.defineProperty';
	}
	else {
		ES = 0;
		gteES5 = false;
		open_close = '';
		open_first = '';
		colon_value = '';
		comma_next = '';
		last_close = '';
		defineProperty = 'Object.defineProperty';
	}
	var pairs :string[] = [];
	var open :string = '{';
	var close :string = '}';
	for ( var key in object ) {
		if ( hasOwnProperty.call(object, key) ) {
			var value :string = ValueLiteral(object[key]);
			if ( key==='__proto__' ) {
				if ( gteES5 && options!.ES!>=6 ) { key = '[\'__proto__\']'; }
				else if ( gteES5 ) {
					close = '}.__proto__';
					pairs.push('get __proto__(){return/*#__PURE__*/'+defineProperty+'(this,\'__proto__\',{configurable:1,enumerable:1,writable:1,value:'+colon_value+value+'})}');
					continue;
				}
				else {
					open = '/*#__PURE__*/function(o,_){o.__proto__?'+defineProperty+'(o,\'__proto__\',{configurable:1,enumerable:1,writable:1,value:_}):(o.__proto__=_._)return o}({';
					close = '},{'+open_first+'_:'+colon_value+value+last_close+'})';
					value = '0';
				}
			}
			else { key = PropertyName(key, ES); }
			pairs.push(key+':'+colon_value+value);
		}
	}
	return open+( pairs.length
			? open_first+pairs.join(','+comma_next)+last_close
			: open_close
	)+close;
}

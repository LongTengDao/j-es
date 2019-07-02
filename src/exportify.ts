import hasOwnProperty from '.Object.prototype.hasOwnProperty';

import { isIdentifier, PropertyName } from './Name';

export default function exportify<Value extends any> (
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
) :string {
	if ( options ) {
		var gteES5 :boolean = options.ES!>=5;
		var gteES6 :boolean = gteES5 && options.ES!>=6;
		var LET :string = options.let || ( gteES6 ? 'const' : 'var' );
		var identifier_equal :string = options.identifier_equal || '';
		var equal_value :string = options.equal_value || '';
		var open_close :string = options.open_close || '';
		var open_first :string = options.open_first || '';
		var colon_value :string = options.colon_value || '';
		var comma_next :string = options.comma_next || '';
		var last_close :string = options.last_close || '';
		var semicolon_next :string = options.semicolon_next || '';
		var default_open :string = options.default_open || '';
		var defineProperty :string = options.defineProperty || 'Object.defineProperty';
	}
	else {
		gteES5 = false;
		gteES6 = false;
		LET = 'var';
		identifier_equal = '';
		equal_value = '';
		open_close = '';
		open_first = '';
		colon_value = '';
		comma_next = '';
		last_close = '';
		semicolon_next = '';
		default_open = '';
		defineProperty = 'Object.defineProperty';
	}
	var named :string = '';
	var pairs :string[] = [];
	var open :string = '{';
	var close :string = '}';
	for ( var key in object ) {
		if ( hasOwnProperty.call(object, key) ) {
			if ( isIdentifier(key, false) ) {
				named += 'export '+LET+' '+key+identifier_equal+'='+equal_value+IdentifierValueLiteral(object[key])+';'+semicolon_next;
				if ( gteES6 ) { pairs.push(key); }
				else if ( key==='__proto__' ) {
					if ( gteES5 ) {
						close = '}.__proto__';
						pairs.push('get __proto__(){return/*#__PURE__*/'+defineProperty+'(this,\'__proto__\',{configurable:1,enumerable:1,writable:1,value:__proto__})}');
					}
					else {
						open = '/*#__PURE__*/function(o){o.__proto__?'+defineProperty+'(o,\'__proto__\',{configurable:1,enumerable:1,writable:1,value:__proto__}):(o.__proto__=__proto__)return o}({';
						close = '})';
						pairs.push('__proto__:'+colon_value+'0');
					}
				}
				else { pairs.push(key+':'+colon_value+key); }
			}
			else { pairs.push(PropertyName(key, gteES5)+':'+colon_value+PropertyValueLiteral(object[key])); }
		}
	}
	return named+
		'export default'+default_open+open+( pairs.length
				? open_first+pairs.join(','+comma_next)+last_close
				: open_close
		)+close+';';
};

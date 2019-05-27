import version from './version?text';
export { version };

var BS = /\\/g;
var LS = /\u2028/g;
var PS = /\u2029/g;
var CR = /\r/g;
var LF = /\n/g;
var SQ = /'/g;
var IdentifierName = /^[a-z_$][\w$]*$/i;
var DecimalIntegerLiteral = /^(?:0|[1-9]\d*)$/;

export function toStringLiteral (string :string) :string {
	return '\''+string.replace(BS, '\\\\').replace(LS, '\\u2028').replace(PS, '\\u2029').replace(CR, '\\r').replace(LF, '\\n').replace(SQ, '\\\'')+'\'';
}

export function isIdentifier (id :string, notESM? :boolean) :boolean {
	if ( IdentifierName.test(id) ) {
		if ( notReservedWordES3(id) ) {
			return notESM ? true : notReservedWordESM(id);
		}
	}
	return false;
}

export function isBareKey (key :string, notES3? :boolean) :boolean {
	if ( IdentifierName.test(key) ) {
		// object = { ['__proto__']: null }
		return notES3 ? true : notReservedWordES3(key);
	}
	if ( DecimalIntegerLiteral.test(key) ) {
		// object[int]
		// _
		return +key+''===key;
	}
	return false;
}

var ES :any = {
	version: version,
	toStringLiteral: toStringLiteral,
	isIdentifier: isIdentifier,
	isBareKey: isBareKey
};
ES['default'] = ES;
export default ES;

function notReservedWordES3 (key :string) :boolean {
	switch ( key ) {
		case 'break':
		case 'case':
		case 'catch':
		case 'class':// ES6
		case 'const':// ES6
		case 'continue':
		case 'debugger':
		case 'default':
		case 'delete':
		case 'do':
		case 'else':
		case 'enum':// ...
		case 'export':// ES6
		case 'extends':// ES6
		case 'finally':
		case 'for':
		case 'function':
		case 'if':
		case 'import':// ES6
		case 'in':
		case 'instanceof':
		case 'new':
		case 'return':
		case 'switch':
		case 'super':// ES6
		case 'this':
		case 'throw':
		case 'try':
		case 'typeof':
		case 'var':
		case 'void':
		case 'while':
		case 'with':
			return false;
		default:
			return true;
	}
}

function notReservedWordESM (id :string) :boolean {
	switch ( id ) {
		case 'arguments':
		case 'eval':
		case 'implements':// ...
		case 'interface':// ...
		case 'let':// +++
		case 'package':// ...
		case 'private':// ...
		case 'protected':// ...
		case 'public':// ...
		case 'static':// ES6
		case 'yield':// +++
			return false;
		default:
			return true;
	}
}

//case 'as':
//case 'async':
//case 'await':
//case 'from':
//case 'get':
//case 'of':
//case 'set':
//case 'undefined':

//case 'abstract':
//case 'int':
//case 'short':
//case 'boolean':
//case 'byte':
//case 'long':
//case 'char':
//case 'final':
//case 'native':
//case 'synchronized':
//case 'float':
//case 'throws':
//case 'goto':
//case 'transient':
//case 'volatile':
//case 'double':

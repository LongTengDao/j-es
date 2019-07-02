'use strict';

const REGenerate = require('regenerate');

const Unicode = category => require('unicode-10.0.0/General_Category/'+category+'/code-points');

require('@ltd/j-dev')(__dirname)(async function build ({ put, tab }) {
	
	const IDENTIFIER_START = REGenerate(
		Unicode('Uppercase_Letter'),
		Unicode('Lowercase_Letter'),
		Unicode('Titlecase_Letter'),
		Unicode('Modifier_Letter'),
		Unicode('Other_Letter'),
		Unicode('Letter_Number'),
		'$',
		'_',
	);
	const IDENTIFIER_START_ES6 = REGenerate(IDENTIFIER_START).remove(0x2E2F);
	const IDENTIFIER_START_ES35 = REGenerate(IDENTIFIER_START_ES6).removeRange(0x10000, 0x10FFFF);
	
	const IDENTIFIER_PART = REGenerate(
		IDENTIFIER_START,
		Unicode('Nonspacing_Mark'),
		Unicode('Spacing_Mark'),
		Unicode('Decimal_Number'),
		Unicode('Connector_Punctuation'),
		0x200C,
		0x200D,
	);
	const IDENTIFIER_PART_ES6 = REGenerate(IDENTIFIER_PART).remove(0x2E2F);
	const IDENTIFIER_PART_ES5 = REGenerate(IDENTIFIER_PART_ES6).removeRange(0x10000, 0x10FFFF);
	const IDENTIFIER_PART_ES3 = REGenerate(IDENTIFIER_PART_ES5).remove(0x200C, 0x200D);
	
	const Cf = REGenerate(
		Unicode('Format'),
	);
	
	await put('dist.js', tab`
		
		export var IDENTIFIER_NAME_ES6 = /^(?:${IDENTIFIER_START_ES6})(?:${IDENTIFIER_PART_ES6})*$/;
		
		export var IDENTIFIER_NAME_ES5 = /^${IDENTIFIER_START_ES35}${IDENTIFIER_PART_ES5}*$/;
		
		export var IDENTIFIER_NAME_ES3 = /^${IDENTIFIER_START_ES35}${IDENTIFIER_PART_ES3}*$/;
		
		export var Cf = /${Cf}/g;
		
	`);
	
})(async function test ({ import_ }) {
	
	const { IDENTIFIER_NAME_ES6, IDENTIFIER_NAME_ES5 } = await import_('./dist.js');
	
	if ( !IDENTIFIER_NAME_ES6.test('\uD842\uDFB7') ) { throw Error('"𠮷" should be Identifier Name'); }
	if ( !IDENTIFIER_NAME_ES6.test('_\uD842\uDFB7') ) { throw Error('"_𠮷" should be Identifier Name'); }
	
	if ( IDENTIFIER_NAME_ES5.test('\uD842\uDFB7') ) { throw Error('"𠮷" should not be Identifier Name in ES 5'); }
	if ( IDENTIFIER_NAME_ES5.test('_\uD842\uDFB7') ) { throw Error('"_𠮷" should not be Identifier Name in ES 5'); }
	
	if ( IDENTIFIER_NAME_ES6.test('\uD842') ) { throw Error('"𠮷"[0] should not be Identifier Name'); }
	if ( IDENTIFIER_NAME_ES6.test('_\uD842') ) { throw Error('"_𠮷".slice(0, 2) should not be Identifier Name'); }
	
	if ( IDENTIFIER_NAME_ES6.test('\uDFB7') ) { throw Error('"𠮷"[1] should not be Identifier Name'); }
	if ( IDENTIFIER_NAME_ES6.test('_\uDFB7') ) { throw Error('"_𠮷".slice(0, 2) should not be Identifier Name'); }
	
});

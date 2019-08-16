'use strict';

// ES3      : unicode-2.1+
// ES5      : unicode-3.0+
// ES6@2015 : unicode-5.1.0+
// ES7@2016 : unicode-8.0.0+
// ES8@2017+: unicode-latest

const Unicode = {
	
	ES3: category => require(`unicode-2.1.8/General_Category/${category}/code-points.js`),
	// 2.1.*	||	Uppercase_Letter	|	Lowercase_Letter	|	Titlecase_Letter	|	Modifier_Letter	|	Other_Letter							||	Nonspacing_Mark	|	Spacing_Mark	|	Connector_Punctuation	||
	//     2:5	||						|						|						|					|											//	-F88~F8B		v	-F3E -F3F		|							||
	//     5:8	||	-1FBE -2118✗		>	+1FBE +2118✗		|						|	-309B -309C		|	+950 +AD0 +E2F +EAF +F00 +F88~F8B +3006	||					|	+F3E +F3F		|	+30FB +FF65				||
	//     8=9
	
	ES5: category => require(`unicode-3.0.0/General_Category/${category}/code-points.js`),
	// 3.0.0=1
	
	ES : category => require(`unicode-12.1.0/General_Category/${category}/code-points.js`),
	
};

const REGenerate = require('regenerate');

require('@ltd/j-dev')(__dirname)(build)(test);

async function build ({ put, tab }) {
	
	const ES3 = new function () {
		const START = REGenerate(
			Unicode.ES3('Uppercase_Letter'),
			Unicode.ES3('Lowercase_Letter'),
			Unicode.ES3('Titlecase_Letter'),
			Unicode.ES3('Modifier_Letter'),
			Unicode.ES3('Other_Letter'),
			Unicode.ES3('Letter_Number'),
			'$', '_',
		).remove(0x2E2F).removeRange(0x10000, 0x10FFFF).remove(0x2118);
		const PART = REGenerate(START,
			Unicode.ES3('Nonspacing_Mark'),
			Unicode.ES3('Spacing_Mark'),
			Unicode.ES3('Decimal_Number'),
			Unicode.ES3('Connector_Punctuation'),
		);
		return { START, PART };
	};
	
	const ES5 = new function () {
		const START = REGenerate(
			Unicode.ES5('Uppercase_Letter'),
			Unicode.ES5('Lowercase_Letter'),
			Unicode.ES5('Titlecase_Letter'),
			Unicode.ES5('Modifier_Letter'),
			Unicode.ES5('Other_Letter'),
			Unicode.ES5('Letter_Number'),
			'$', '_',
		).remove(0x2E2F).removeRange(0x10000, 0x10FFFF);
		const PART = REGenerate(START,
			Unicode.ES5('Nonspacing_Mark'),
			Unicode.ES5('Spacing_Mark'),
			Unicode.ES5('Decimal_Number'),
			Unicode.ES5('Connector_Punctuation'),
			0x200C, 0x200D,
		);
		return { START, PART };
	};
	
	const ES = new function () {
		const START = REGenerate(
			Unicode.ES('Uppercase_Letter'),
			Unicode.ES('Lowercase_Letter'),
			Unicode.ES('Titlecase_Letter'),
			Unicode.ES('Modifier_Letter'),
			Unicode.ES('Other_Letter'),
			Unicode.ES('Letter_Number'),
			'$', '_',
		).remove(0x2E2F);
		const PART = REGenerate(START,
			Unicode.ES('Nonspacing_Mark'),
			Unicode.ES('Spacing_Mark'),
			Unicode.ES('Decimal_Number'),
			Unicode.ES('Connector_Punctuation'),
			0x200C, 0x200D,
		);
		const Cf = REGenerate(Unicode.ES('Format'));
		return { START, PART, Cf };
	};
	
	await put('dist.js', tab`
		
		export var IDENTIFIER_NAME_ES6 = /^(?:${ES.START})(?:${ES.PART})*$/;
		
		export var IDENTIFIER_NAME_ES5 = /^${ES5.START}${ES5.PART}*$/;
		
		export var IDENTIFIER_NAME_ES3 = /^${ES3.START}${ES3.PART}*$/;
		
		export var Cf = /${ES.Cf}/g;
		
	`);
	
}

async function test ({ import_ }) {
	
	const { IDENTIFIER_NAME_ES6, IDENTIFIER_NAME_ES5 } = await import_('./dist.js');
	
	for ( const each of '1FBE,2118,309B,309C,950,AD0,E2F,EAF,F00,F88,F89,F8A,F8B,3006'.split(',') ) {
		console.info(`"\\u${each}" ES5.test ${IDENTIFIER_NAME_ES5.test(String.fromCharCode(parseInt(each, 16)))}`);
	}
	for ( const each of 'F88,F89,F8A,F8B,F3E,F3F,30FB,FF65'.split(',') ) {
		console.info(`"_\\u${each}" ES5.test ${IDENTIFIER_NAME_ES5.test('_'+String.fromCharCode(parseInt(each, 16)))}`);
	}
	console.info(`"\\u2118" ES6.test ${IDENTIFIER_NAME_ES6.test('\u2118')}`);// LetterLike Symbols (2100~214F)
	
	if ( !IDENTIFIER_NAME_ES6.test('\uD842\uDFB7') ) { throw Error('"𠮷" should be Identifier Name'); }
	if ( !IDENTIFIER_NAME_ES6.test('_\uD842\uDFB7') ) { throw Error('"_𠮷" should be Identifier Name'); }
	
	if ( IDENTIFIER_NAME_ES5.test('\uD842\uDFB7') ) { throw Error('"𠮷" should not be Identifier Name in ES 5'); }
	if ( IDENTIFIER_NAME_ES5.test('_\uD842\uDFB7') ) { throw Error('"_𠮷" should not be Identifier Name in ES 5'); }
	
	if ( IDENTIFIER_NAME_ES6.test('\uD842') ) { throw Error('"𠮷"[0] should not be Identifier Name'); }
	if ( IDENTIFIER_NAME_ES6.test('_\uD842') ) { throw Error('"_𠮷".slice(0, 2) should not be Identifier Name'); }
	
	if ( IDENTIFIER_NAME_ES6.test('\uDFB7') ) { throw Error('"𠮷"[1] should not be Identifier Name'); }
	if ( IDENTIFIER_NAME_ES6.test('_\uDFB7') ) { throw Error('"_𠮷".slice(0, 2) should not be Identifier Name'); }
	
}

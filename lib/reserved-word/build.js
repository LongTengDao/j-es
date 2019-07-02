'use strict';

const groupify = require('@ltd/j-groupify');

require('@ltd/j-dev')(__dirname)(async function build ({ get, put, tab }) {
	
	const ALL = /^\uFEFF?[a-z]+/gm;
	
	const ES3 = ( await get('src.ES3.txt') ).match(ALL).sort();
	const ES5 = ES3.concat(( await get('src.ESM.txt') ).match(ALL)).sort();
	
	await put('dist.js', tab`
		
		export var RESERVED_WORD_ES3 = /^${groupify(ES3)}$/;
		
		export var RESERVED_WORD_ESM = /^${groupify(ES5)}$/;
		
	`);
	
});

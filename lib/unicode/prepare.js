'use strict';

const { readdirSync: dir, statSync: stat, unlinkSync: del, rmdirSync: rm, writeFileSync: put, readFileSync: get } = require('fs');

const reserve1 = new Set([ 'General_Category' ]);
const reserve2 = new Set([
	'Uppercase_Letter',
	'Lowercase_Letter',
	'Titlecase_Letter',
	'Modifier_Letter',
	'Other_Letter',
	'Letter_Number',
	'Nonspacing_Mark',
	'Spacing_Mark',
	'Decimal_Number',
	'Connector_Punctuation',
	'Format',
]);
const reserve3 = new Set([ 'code-points.js' ]);

const node_modules = `${__dirname}/node_modules`;
for ( const id of dir(node_modules) ) {
	if ( !/^unicode-\d+\.\d+\.\d+$/.test(id) ) { continue; }
	remove(`${node_modules}/${id}`, reserve1);
	remove(`${node_modules}/${id}/General_Category`, reserve2);
	for ( const each of reserve2 ) {
		let path = `${node_modules}/${id}/General_Category/${each}`;
		remove(path, reserve3);
		path += '/code-points.js';
		const code = get(path, 'utf8');
		if ( code[code.indexOf(',')+1]==='\n' ) { continue; }
		console.info(`NORMALIZING ${path}`);
		if ( code.endsWith(']') ) {
			put(path, code.replace('[', '[\n\t').replace(']', ',\n]').replace(/,/g, ',\n\t'));
		}
		else {
			put(path, 'module.exports=[\n\t'+require(path).join(',\n\t')+',\n]')
		}
	}
}

function remove (under, reserve) {
	for ( const filename of dir(under) ) {
		if ( reserve.has(filename) ) { continue; }
		removeAll(`${under}/${filename}`);
	}
}

function removeAll (path) {
	if ( stat(path).isDirectory() ) {
		for ( const filename of dir(path) ) {
			removeAll(`${path}/${filename}`);
		}
		rm(path);
	}
	else {
		del(path);
	}
}

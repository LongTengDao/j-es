'use strict';

module.exports = require('@ltd/j-dev')(__dirname+'/..')(async ({ build, 龙腾道, get, ful }) => {
	
	const zhs = 'ECMAScript 语法相关共享实用程序。从属于“简计划”。';
	const en = 'ECMAScript syntax util. Belong to "Plan J".';
	
	await build({
		name: 'j-es',
		user: 'LongTengDao@ltd',
		Name: 'ES',
		Desc: [ zhs, en ],
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		semver: await get('src/version'),
		locate: {
			'lib:unicode': ful('lib/unicode/dist.js'),
			'lib:reserved-word': ful('lib/reserved-word/dist.js'),
		},
		ES: 3,
		ESM: true,
		NPM: { description: `${en}／${zhs}` },
		UMD: { main_global: 'ES' },
		LICENSE_: true,
	});
	
});

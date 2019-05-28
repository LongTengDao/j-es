'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, get }) => {
	
	await build({
		name: 'j-es',
		Name: '@ltd/j-es',
		Desc: `
			ECMAScript 语法相关共享实用程序。
			ECMAScript syntax util.`,
		semver: await get('src/version'),
		ES: 3,
		ESM: true,
		NPM: {
			meta_: {
				description: 'ECMAScript syntax util.／ECMAScript 语法相关共享实用程序。',
			},
		},
		UMD: {
			main_global: 'ES',
		},
	});
	
});

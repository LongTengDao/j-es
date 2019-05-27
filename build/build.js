'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, get }) => {
	
	await build({
		name: 'j-es',
		Name: '@ltd/j-es',
		semver: await get('src/version'),
		ES: 3,
		ESM: true,
		NPM: true,
		UMD: {
			main_global: 'ES',
		},
	});
	
});

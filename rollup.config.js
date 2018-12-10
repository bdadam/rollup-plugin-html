import buble from 'rollup-plugin-buble';

var pkg = require('./package.json');
var external = Object.keys(pkg.dependencies).concat('path');

export default {
	input: 'index.js',
	plugins: [buble()],
	external: external,
	output: [
		{
			format: 'cjs',
			file: pkg['main']
		},
		{
			format: 'es',
			file: pkg['jsnext:main']
		}
	]
};

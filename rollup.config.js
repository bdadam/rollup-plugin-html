import buble from 'rollup-plugin-buble';

var pkg = require('./package.json');
var external = Object.keys(pkg.dependencies).concat('path');

export default {
	entry: 'index.js',
	plugins: [buble()],
	external: external,
	targets: [
		{
			format: 'cjs',
			dest: pkg['main']
		},
		{
			format: 'es6',
			dest: pkg['jsnext:main']
		}
	]
};

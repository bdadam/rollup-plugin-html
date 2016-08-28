var assert = require('assert');
var { rollup } = require('rollup');
var html = require('../');

process.chdir('test');

function makeBundle(options, stringOptions) {
	options.plugins = [html(stringOptions)];
	return rollup(options);
}

describe('rollup-plugin-html', () => {
	it('should import html from file as string', () => {
		return makeBundle({ entry: 'fixtures/basic.js' }, { include: '**/*.html' }).then(bundle => {
			const { code } = bundle.generate({ format: 'iife', moduleName: 'tpl' });
			new Function('assert', code)(assert);
		});
	});

	it('should output empty sourcemap', () => {
		return makeBundle({ entry: 'fixtures/basic.js' }, { include: '**/*.html' }).then(bundle => {
			const { code, map } = bundle.generate({ sourceMap: true });
			assert.ok(code);
			assert.ok(map);
		});
	});

	it('should import minified html when html-minifier options are present', () => {
		return makeBundle({ entry: 'fixtures/basic.js' }, { include: '**/*.html', htmlMinifierOptions: { collapseWhitespace: true, collapseBooleanAttributes: true, conservativeCollapse: true, minifyJS: true } }).then(bundle => {
			const { code, map } = bundle.generate();
			assert.ok(code);
			assert.notEqual(code.indexOf(`var tpl = "<h1>This is the Title</h1> <section class=\\"section\\"> <article class=\\"article\\">Article 1</article> <article class=\\"article\\">Article 2</article> </section> <script>!function(){console.log(\\"init\\")}()</script> ";`), -1);
		});
	});
});

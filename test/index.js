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
		return makeBundle({ input: 'fixtures/basic.js' }, { include: '**/*.html' }).then(bundle => {
			return bundle.generate({ format: 'iife', moduleName: 'tpl' });
		}).then(({ code }) => {
			return new Function('assert', code)(assert);
		});
	});

	it('should output empty sourcemap', () => {
		return makeBundle({ input: 'fixtures/basic.js' }, { include: '**/*.html' }).then(bundle => {
			return bundle.generate({ format: 'es', sourcemap: true });
		}).then(({ code, map }) => {
			assert.ok(code);
			assert.ok(map);
		});
	});

	it('should import minified html when html-minifier options are present', () => {
		const htmlMinifierOptions = {
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			conservativeCollapse: true,
			minifyJS: true
		};
		const htmlOptions = { include: '**/*.html', htmlMinifierOptions };

		return makeBundle({ input: 'fixtures/basic.js' }, htmlOptions).then(bundle => {
			return bundle.generate({ format: 'iife' });
		}).then(({ code, map }) => {
			assert.ok(code);
			assert.notEqual(code.indexOf(`var tpl = "<h1>This is the Title</h1> <section class=\\"section\\"> <article class=\\"article\\">Article 1</article> <article class=\\"article\\">Article 2</article> </section> <script>console.log(\\"init\\")</script> ";`), -1);
		});
	});
});

import { createFilter } from 'rollup-pluginutils';
import { minify } from 'html-minifier';

export default function string(opts = {}) {
	if (!opts.include) {
		throw Error('include option should be specified');
	}

	const filter = createFilter(opts.include, opts.exclude);

	return {
		name: 'html',

		transform(code, id) {

			if (filter(id)) {
				const x = {
					code: `export default ${JSON.stringify(minify(code, opts.htmlMinifierOptions))};`,
					map: { mappings: '' }
				};

				// console.log(x);

				return x;
			}
		}
	};
}

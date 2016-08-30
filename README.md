# rollup-plugin-html [![Build Status](https://travis-ci.org/bdadam/rollup-plugin-html.svg)](https://travis-ci.org/bdadam/rollup-plugin-html)

Rollup plugin for loading content of HTML files to use as string variable in JavaScript code.

## Installation

```bash
npm install --save-dev rollup-plugin-html
```


## Usage

```js
import { rollup } from 'rollup';
import html from 'rollup-plugin-html';

rollup({
	entry: 'main.js',
	plugins: [
		html({
			include: '**/*.html'
		})
	]
}).then(...)
```

## Options

### include

Type: `array` or `string`  
Default: `**/*.html`

A single file pattern, or an array of file patterns to include when importing html files. For more details see [rollup-pluginutils](https://github.com/rollup/rollup-pluginutils#createfilter).

### exclude

Type: `array` or `string`  
Default: `undefined`

A single file pattern, or an array of file patterns to exclude when importing html files. For more details see [rollup-pluginutils](https://github.com/rollup/rollup-pluginutils#createfilter).

### htmlMinifierOptions

Type: `Object`
Default: `{}`

The options which are given to [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference)

E.g.:
```JavaScript
rollup({
	entry: 'main.js',
	plugins: [
		html({
			include: '**/*.html',
			htmlMinifierOptions: {
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				conservativeCollapse: true,
				minifyJS: true
			}
		})
	]
}).then(...)
```

## License

MIT

## Credits

Thanks for Bogdan Chadkin (@TrySound) for his [rollup-plugin-string](https://github.com/TrySound/rollup-plugin-string) rollup plugin which I used as the basis for this plugin.

import tpl from './templates/tpl.html';

assert.equal(typeof tpl, 'string');
assert.notEqual(tpl.indexOf('section'), -1);
assert.notEqual(tpl.indexOf('article'), -1);
assert.equal(tpl, `<h1>This is the Title</h1>

<section class="section">
	<article class="article">Article 1</article>
	<article class="article">Article 2</article>
</section>

<script>
	(function() {
		console.log('init');
	}());
</script>
`);

<script>
	import '../app.css';
	import { Runatics } from 'runatics';
	import Nav from './components/Nav.svelte';
	import Footer from './components/Footer.svelte';
	import { MetaTags, deepMerge } from 'runes-meta-tags';
	import { page } from '$app/state';

	let { children, data } = $props();
	let metaTags = $derived(
		page.data.pageMetaTags
			? deepMerge(page.data.layoutMetaTags, page.data.pageMetaTags)
			: data.layoutMetaTags
	);

	const analyticsId = $derived(data.ANALYTICS_ID_LANGUAGE_APP);
</script>

<Runatics {analyticsId} />
<MetaTags {...metaTags} />

<Nav />

<section class="border-b border-gray-200 pb-16 dark:border-gray-600">
	<div class="mx-auto max-w-screen-xl px-4 pt-8 text-center">
		{@render children()}
	</div>
</section>

<Footer />

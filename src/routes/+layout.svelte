<script>
	import '../app.pcss';
	import { Runatics } from 'runatics';
	import Nav from './components/Nav.svelte';
	import Footer from './components/Footer.svelte';
	import { RunesMetaTags, deepMerge } from 'runes-meta-tags';
  import { page } from '$app/stores';

	let { children, data } = $props();
	let metaTags = $state(
    $page.data.pageMetaTags
      ? deepMerge($page.data.layoutMetaTags, $page.data.pageMetaTags)
      : data.layoutMetaTags
  );

  $effect(() => {
    metaTags = $page.data.pageMetaTags ? deepMerge($page.data.layoutMetaTags, $page.data.pageMetaTags ) : data.layoutMetaTags
  });

  const analyticsId = data.ANALYTICS_ID_LANGUAGE_APP
</script>

<Runatics {analyticsId} />
<RunesMetaTags {...metaTags}/>

<Nav />

<section class="pb-16 border-b border-gray-200 dark:border-gray-600">
	<div class="mx-auto max-w-screen-xl px-4 pt-8 text-center">
		{@render children()}
	</div>
</section>

<Footer />

<script>
	import '../app.pcss';
	let { children } = $props();
	import Nav from './components/Nav.svelte';
	import Footer from './components/Footer.svelte';
</script>

<Nav />

<section class="pb-16 border-b border-gray-200 dark:border-gray-600">
	<div class="mx-auto max-w-screen-xl px-4 pt-8 text-center">
		{@render children()}
	</div>
</section>

<Footer />

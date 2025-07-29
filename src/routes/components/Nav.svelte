<script>
	import Jp from '$lib/Jp.svelte';

	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers, DarkMode, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/state';

	let activeUrl = $state(page.url.pathname);
	$effect(() => {
		activeUrl = page.url.pathname;
	});

	let nav = uiHelpers();

	let navStatus = $state(false);
	let toggleNav = nav.toggle;
	let closeNav = nav.close;

	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		navStatus = nav.isOpen;
	});
</script>

<header
	class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-900"
>
	<Navbar fluid class="px-8">
		<NavBrand href="/">
			<Jp size="40" class="inline" />
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-2">Nihongo-Flashcard</span>
		</NavBrand>
		
		<div class="flex items-center lg:order-2">
			<DarkMode class="inline-block hover:text-gray-900 dark:hover:text-white" />
			<NavHamburger />
		</div>
		
		<NavUl {activeUrl} class="lg:order-1 lg:space-x-5 xl:space-x-8">
			<NavLi href="/">Home</NavLi>
			<NavLi href="/one-thousand-words">1K words</NavLi>
			<NavLi href="/verbs">Verbs</NavLi>
			<NavLi href="/adjectives">Adjectives</NavLi>
			<NavLi href="/gairaigo">Gairaigo</NavLi>
			<NavLi href="/onomatopoeia">Onomatopoeia</NavLi>
			<NavLi href="/about">About</NavLi>
		</NavUl>
	</Navbar>
</header>

<script>
	import Jp from '$lib/Jp.svelte';
	import { Navbar, NavLi, NavBrand, NavUl, DarkMode, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/state';

	let activeUrl = $state(page.url.pathname);
	$effect(() => {
		activeUrl = page.url.pathname;
	});
	let activeClass = 'p-2 text-base hover:text-gray-600';
	let nonActiveClass = 'p-2 text-base hover:text-gray-600';
</script>

<Navbar
	breakpoint="lg"
	fluid
	class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-900"
	navContainerClass="lg:justify-between"
>
	<NavBrand href="/">
		<Jp size="40" class="inline" />
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-2">Nihongo-Flashcard</span>
	</NavBrand>
	
	<div class="flex justify-end lg:order-2">
		<NavHamburger class="order-3" />
		<DarkMode class="inline-block hover:text-gray-900 dark:hover:text-white" />
	</div>
	
	<NavUl
		{activeUrl}
		class="order-2 lg:order-1"
		classes={{ active: activeClass, nonActive: nonActiveClass, ul: 'p-0' }}
	>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/one-thousand-words">1K words</NavLi>
		<NavLi href="/verbs">Verbs</NavLi>
		<NavLi href="/adjectives">Adjectives</NavLi>
		<NavLi href="/gairaigo">Gairaigo</NavLi>
		<NavLi href="/onomatopoeia">Onomatopoeia</NavLi>
		<NavLi href="/about">About</NavLi>
	</NavUl>
</Navbar>

<script>
	import Jp from '$lib/Jp.svelte';

	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers, Darkmode } from 'svelte-5-ui-lib';
	let nav = uiHelpers();

	let navStatus = $state(false);
	let toggleNav = nav.toggle;
	let closeNav = nav.close;

	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		navStatus = nav.isOpen;
	});
	let divClass = 'ml-auto w-full';
</script>

<header
	class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-900"
>
	<Navbar {toggleNav} {closeNav} {navStatus} breakPoint="lg" fluid div2Class="px-8">
		{#snippet brand()}
			<NavBrand siteName="Nihongo Flashcard">
				<Jp size="40" class="inline" />
			</NavBrand>
			<div class="ml-auto flex items-center lg:order-1">
				<Darkmode class="inline-block dark:hover:text-white hover:text-gray-900" />
			</div>
		{/snippet}

		<NavUl class="xl:space-x-8 lg:space-x-5">
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

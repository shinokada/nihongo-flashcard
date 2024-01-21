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
	let divClass = "ml-auto w-full"
    let ulClass =
    'flex flex-col py-3 lg:flex-row lg:my-0 text-sm order-1 font-medium gap-4 lg:gap-2 dark:lg:bg-transparent border-0';
    let navClass = 'w-full divide-gray-200 border-gray-200 px-2 py-2.5 text-gray-500 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 sm:px-4'

</script>

<header
    class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-900"
  >
  <Navbar {navClass} {toggleNav} {closeNav} {navStatus} breakPoint="lg" fluid divChildrenClass={divClass}>

	{#snippet brand()}
		<NavBrand siteName="Nihongo Flashcard" {closeNav}>
			<Jp size={50} class="inline" />
		</NavBrand>
		<div class="flex items-center ml-auto lg:order-1">
            <Darkmode class="inline-block dark:hover:text-white hover:text-gray-900" />
        </div>
	{/snippet}

	<NavUl {ulClass}>
		<NavLi href="/" {closeNav}>Home</NavLi>
		<NavLi href="/one-thousand" {closeNav}>1K words</NavLi>
		<NavLi href="/verbs" {closeNav}>Verbs</NavLi>
		<NavLi href="/adjectives" {closeNav}>Adjectives</NavLi>
		<NavLi href="/gairaigo" {closeNav}>Gairaigo</NavLi>
		<NavLi href="/onomatopoeia" {closeNav}>Onomatopoeia</NavLi>
	</NavUl>
</Navbar>
</header>

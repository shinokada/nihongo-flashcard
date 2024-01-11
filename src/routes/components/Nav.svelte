<script>
	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers } from 'svelte-5-ui-lib';
	import Jp from '$lib/Jp.svelte'

	let nav = uiHelpers();

	let navStatus = $state();
	let toggleNav = nav.toggleNav;
	let closeNav = nav.closeNav;

	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		navStatus = nav.navStatus;
		$inspect('navStatus: ', navStatus)
	});
</script>

<Navbar {toggleNav} {closeNav} {navStatus} breakPoint="lg">
	{#snippet brand()}
		<NavBrand siteName="Japanese flashcard" {closeNav}>
			<Jp size={50} class="inline"/> 
			</NavBrand>
	{/snippet}
	<NavUl>
		<NavLi href="/" {closeNav}>3K Words</NavLi>
		<NavLi href="/one-thousand" {closeNav}>1K Words</NavLi>
		<NavLi href="/verbs" {closeNav}>Verbs</NavLi>
		<NavLi href="/adjectives" {closeNav}>Adjectives</NavLi>
		<NavLi href="/gairaigo" {closeNav}>Gairaigo</NavLi>
		<NavLi href="/onomatopoeia" {closeNav}>Onomatopoeia</NavLi>
	</NavUl>
</Navbar>

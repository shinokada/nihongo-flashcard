<script>
	import Jp from '$lib/Jp.svelte'

	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers } from 'svelte-5-ui-lib';
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

<Navbar {toggleNav} {closeNav} {navStatus} breakPoint="xl">
{#snippet brand()}
<NavBrand siteName="Nihongo Flashcard" {closeNav}>
	<Jp size={50} class="inline"/> 
</NavBrand>
{/snippet}

    <NavUl>
    	<NavLi href="/" {closeNav}>Home</NavLi>
    	<NavLi href="/one-thousand" {closeNav}>1K words</NavLi>
    	<NavLi href="/verbs" {closeNav}>Verbs</NavLi>
        <NavLi href="/adjectives" {closeNav}>Adjectives</NavLi>
        <NavLi href="/gairaigo" {closeNav}>Gairaigo</NavLi>
        <NavLi href="/onomatopoeia" {closeNav}>Onomatopoeia</NavLi>
    </NavUl>
</Navbar>
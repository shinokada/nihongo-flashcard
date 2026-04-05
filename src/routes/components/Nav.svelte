<script lang="ts">
	import Jp from '$lib/Jp.svelte';
	import {
		Navbar,
		NavLi,
		NavBrand,
		NavUl,
		NavHamburger,
		DarkMode,
		MegaMenu
	} from 'flowbite-svelte';
	import { page } from '$app/state';
	import { CATEGORIES_BY_LEVEL } from '$lib/types';
	import { removeHyphensAndCapitalize } from '$lib/utils';
	import ChevronDownOutline from './ChevronDownOutline.svelte';

	let activeUrl = $derived(page.url.pathname);
	let activeClass = 'p-2 text-base hover:text-gray-500';
	let nonActiveClass = 'p-2 text-base hover:text-gray-500';

	const linkClass =
		'flex items-center gap-1.5 py-1 text-sm text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400';
	const badgeClass =
		'shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-gray-500 dark:bg-gray-600 dark:text-gray-400';

	const n5Items = CATEGORIES_BY_LEVEL.N5.map((c) => ({
		name: removeHyphensAndCapitalize(c),
		href: `/n5/${c}`,
		level: 'N5'
	}));

	const n4Items = CATEGORIES_BY_LEVEL.N4.map((c) => ({
		name: removeHyphensAndCapitalize(c),
		href: `/n4/${c}`,
		level: 'N4'
	}));
</script>

<Navbar
	breakpoint="lg"
	fluid
	class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-900"
	navContainerClass="lg:justify-between"
>
	<NavBrand href="/">
		<Jp size="40" class="inline" />
		<span class="ml-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white"
			>Nihongo Flashcard</span
		>
	</NavBrand>

	<div class="flex items-center lg:order-2">
		<DarkMode class="inline-block hover:text-gray-900 dark:hover:text-white" />
		<NavHamburger />
	</div>

	<NavUl
		breakpoint="lg"
		{activeUrl}
		class="order-2 lg:order-1"
		classes={{ active: activeClass, nonActive: nonActiveClass, ul: 'p-0' }}
	>
		<NavLi class="cursor-pointer">
			JLPT N5 <ChevronDownOutline size="sm" class="ms-1 inline" />
		</NavLi>
		<MegaMenu items={n5Items}>
			{#snippet children({ item })}
				<a href={item.href} class={linkClass}>
					<span class={badgeClass}>{item.level}</span>
					{item.name}
				</a>
			{/snippet}
		</MegaMenu>

		<NavLi class="cursor-pointer">
			JLPT N4 <ChevronDownOutline size="sm" class="ms-1 inline" />
		</NavLi>
		<MegaMenu items={n4Items}>
			{#snippet children({ item })}
				<a href={item.href} class={linkClass}>
					<span class={badgeClass}>{item.level}</span>
					{item.name}
				</a>
			{/snippet}
		</MegaMenu>

		<NavLi href="/about">About</NavLi>
	</NavUl>
</Navbar>

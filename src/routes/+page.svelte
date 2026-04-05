<script lang="ts">
	import { CATEGORIES_BY_LEVEL } from '$lib/types';
	import { removeHyphensAndCapitalize } from '$lib/utils';

	const levels = [
		{
			id: 'N5',
			label: 'JLPT N5 — Beginner',
			description: 'Essential vocabulary for everyday situations',
			color: 'green'
		},
		{
			id: 'N4',
			label: 'JLPT N4 — Elementary',
			description: 'Broader vocabulary for familiar topics',
			color: 'blue'
		}
	] as const;

	const badgeColors: Record<string, string> = {
		green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
		blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
	};
</script>

<h1 class="mt-8 mb-2 text-4xl font-bold dark:text-white">日本語 Flashcard</h1>
<p class="mb-10 text-lg text-gray-600 dark:text-gray-400">
	Practice Japanese vocabulary for JLPT N5 and N4. Choose a level and category to get started.
</p>

<div class="space-y-10 text-left">
	{#each levels as { id, label, description, color } (id)}
		{@const categories = CATEGORIES_BY_LEVEL[id]}
		{@const badge = badgeColors[color]}
		<div>
			<h2 class="mb-1 text-xl font-semibold dark:text-white">{label}</h2>
			<p class="mb-3 text-sm text-gray-500 dark:text-gray-400">{description}</p>
			<div class="flex flex-wrap gap-2">
				{#each categories as cat (cat)}
					<a
						href="/{id.toLowerCase()}/{cat}"
						class="{badge} rounded-full px-3 py-1 text-sm font-medium transition-opacity hover:opacity-75"
					>
						{removeHyphensAndCapitalize(cat)}
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>

<script lang="ts">
	import { Button } from 'svelte-5-ui-lib';
	interface Props {
		langlang: string;
		front: string;
		back: string;
	}

	let { langlang, front, back }: Props = $props();

	const dict1 = 'https://takoboto.jp/?q=';
	const dict2 = 'https://www.japandict.com/?s=';
	// https://www.japandict.com/?s=%E4%B8%B8&lang=eng

	let searchWord = $derived(langlang === 'japeng' ? dictionaryWord(front) : dictionaryWord(back));

	let showDictionaryLink: boolean = $derived(langlang === 'japeng' ? true : false);

	function dictionaryWord(word: string) {
		// Use regular expression to match everything outside brackets
		return word.replace(/[(]([^)]*)[)]/g, '');
	}
</script>

<div class="mx-auto mt-4 flex w-1/3 justify-center gap-2">
	{#if showDictionaryLink}
		<Button class="p-2 sm:p-4" target="_blank" href={`${dict1}${searchWord}`}>Takoboto: {searchWord}</Button>
		<Button class="p-2 sm:p-4" target="_blank" href={`${dict2}${searchWord}`}>Japandict: {searchWord}</Button>
	{/if}
</div>

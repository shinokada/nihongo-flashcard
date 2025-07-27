<script lang="ts">
	import SearchLinks from './SearchLinks.svelte';
	import { Flashcard, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from '$lib';
	import { getRandomPair } from '$lib/utils';
	import { twMerge } from 'tailwind-merge';

	interface WordPair {
		front: string;
		back: string;
	}

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	interface Props {
		dictionary: any;
		isVerb?: boolean;
		title?: string;
		pFront?: string;
		pBack?: string;
	}
	let { dictionary, isVerb, title = 'Flashcard', pFront, pBack }: Props = $props();

	let front: string = $state('');
	let back: string = $state('');
	let showCardBack: boolean = $state(false);
	let showFront: string = $state('日本語');
	let showBack: string = $state('English');
	let lang1lang2: string = $state(
		'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-3 sm:px-5 py-1 sm:py-2.5 me-1 sm:me-2 mb-1 sm:mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 opacity-100'
	);
	let lang2lang1: string = $state(
		'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-3 sm:px-5 py-1 sm:py-2.5 me-1 sm:me-2 mb-1 sm:mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 opacity-50'
	);
	let lang1lang1: string = $state(
		'focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-lg px-3 sm:px-5 py-1 sm:py-2.5 me-1 sm:me-2 mb-1 sm:mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900 opacity-50'
	);

	// Add word history
	let wordHistory = $state<Array<WordPair>>([]);
	let currentIndex = $state(-1);

	const toggleShowBack = () => (showCardBack = !showCardBack);

	const getNewWord = (lang: string) => {
		const result = getRandomPair(dictionary, lang, isVerb);
		return {
			front: result.front || '',
			back: result.back || ''
		};
	};

	const updateLang = (lang: string, addToHistory = true) => {
		langlang = lang;
		if (lang === 'japeng') {
			showFront = '日本語';
			showBack = 'English';
			lang1lang2 = twMerge(lang1lang2, 'opacity-100');
			lang2lang1 = twMerge(lang2lang1, 'opacity-50');
			if (isVerb) {
				lang1lang1 = twMerge(lang1lang1, 'opacity-50');
			}
		} else if (lang === 'engjap') {
			showFront = 'English';
			showBack = '日本語';
			lang1lang2 = twMerge(lang1lang2, 'opacity-50');
			lang2lang1 = twMerge(lang2lang1, 'opacity-100');
			if (isVerb) {
				lang1lang1 = twMerge(lang1lang1, 'opacity-50');
			}
		} else if (lang === 'kanjap') {
			showFront = 'Kanji';
			showBack = 'Hiragana';
			lang1lang2 = twMerge(lang1lang2, 'opacity-50');
			lang2lang1 = twMerge(lang2lang1, 'opacity-50');
			if (isVerb) {
				lang1lang1 = twMerge(lang1lang1, 'opacity-100');
			}
		}
		showCardBack = false;

		const newWord = getNewWord(lang);

		if (addToHistory) {
			// Remove any forward history if we're not at the end
			if (currentIndex < wordHistory.length - 1) {
				wordHistory = wordHistory.slice(0, currentIndex + 1);
			}
			wordHistory = [...wordHistory, newWord];
			currentIndex = wordHistory.length - 1;
		}
		front = newWord.front;
		back = newWord.back;
	};

	const showPreviousWord = () => {
		if (currentIndex > 0) {
			currentIndex--;
			const prevWord = wordHistory[currentIndex];
			front = prevWord.front;
			back = prevWord.back;
			showCardBack = false;
		}
	};

	const showNextWord = () => {
		if (currentIndex < wordHistory.length - 1) {
			currentIndex++;
			const nextWord = wordHistory[currentIndex];
			front = nextWord.front;
			back = nextWord.back;
			showCardBack = false;
		}
	};

	let langlang = $state('japeng');

	// Initialize with first word
	$effect(() => {
		const initialWord = getNewWord(langlang);
		$inspect('word: ', initialWord);
		front = initialWord.front;
		back = initialWord.back;
		wordHistory = [initialWord];
		currentIndex = 0;
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			toggleShowBack();
		} else if (event.key === 'ArrowRight') {
			updateLang(langlang);
		} else if (event.key === 'ArrowUp') {
			showPreviousWord();
		} else if (event.key === 'ArrowDown') {
			showNextWord();
		} else if (event.key === 'Enter' || event.key === ' ') {
			toggleShowBack();
		}
	}


	function preventDefault(fn: (event: KeyboardEvent) => void) {
		return function (this: HTMLElement, event: KeyboardEvent) {
			event.preventDefault();
			fn.call(this, event);
		};
	}
</script>

<div class="mt-15 flex flex-col items-center">
	<h1 class="m-4 text-3xl">{title}</h1>
	<div class="flex justify-between">
		<button type="button" class={lang1lang2} onclick={() => updateLang('japeng')}
			>Japanese-English</button
		>
		<button class={lang2lang1} onclick={() => updateLang('engjap')}>English-Japanese</button>
		{#if isVerb}
			<button class={lang1lang1} onclick={() => updateLang('kanjap')}>Kanji-Hiragana</button>
		{/if}
	</div>
	<!-- FLASHCARD -->
	<div class="flip-box h-96 w-full bg-transparent md:w-1/2">
		<div
			class="flip-box-inner"
			class:flip-it={showCardBack}
			onclick={toggleShowBack}
			onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleShowBack()}
			tabindex="0"
			role="button"
			aria-pressed={showCardBack}
		>
			<Flashcard {front} {back} {showCardBack} {pFront} {pBack} />
		</div>

	</div>

	<!-- BUTTONS -->
	<div class="grid grid-cols-3 sm:flex-row gap-2 pt-4">
		<button
			onclick={showPreviousWord}
			class="inline-flex items-center bg-gray-300 p-2 sm:p-4 dark:bg-gray-700"
			disabled={currentIndex <= 0}
		>
			<ArrowUp class="mr-4" />
			Previous
		</button>

		<button
			onclick={showNextWord}
			class="inline-flex items-center bg-gray-300 p-2 sm:p-4 dark:bg-gray-700"
			disabled={currentIndex >= wordHistory.length - 1}
		>
			<ArrowDown class="mr-4" />
			Forward
		</button>

		<button
			class="inline-flex bg-gray-300 p-2 sm:p-4 text-right dark:bg-gray-700"
			onclick={() => updateLang(langlang)}
		>
			NEXT
			<ArrowRight class="ml-4" />
		</button>
	</div>
	<span class="right-full mt-4 rounded bg-gray-900 px-2 py-1 text-white">
		Click the card or press ← / Space / Enter to flip. → for next, ↑ for previous, ↓ to go forward.
	</span>
</div>

<SearchLinks {langlang} {front} {back} />

<svelte:window onkeydown={preventDefault(handleKeyDown)} />

<style>
	/* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.flip-box {
		background-color: transparent;
		/* width: 400px;
		height: 300px; */
		/* 		border: 1px solid #ddd; */
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	/* This container is needed to position the front and back side */
	.flip-box-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
		cursor: pointer;
		user-select: none;
	}

	/* Do an horizontal flip on button click */
	.flip-it {
		transform: rotateY(180deg);
	}
</style>

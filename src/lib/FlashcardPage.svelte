<script lang="ts">
	// import dictionary from '$lib/data/verbs.json';
  interface Props{
    dictionary: any;
		isVerb?: boolean;
		title?: string;
		pFront?: string;
		pBack?: string;
	}

	import { Flashcard } from '$lib';
  import { getRandomPair } from '$lib/utils.svelte.js';
	import { twMerge } from 'tailwind-merge';
  let { dictionary, isVerb, title="Flashcard", pFront, pBack } = $props<Props>()
	let langlang = $state('japeng')
  let front = $state()
	let back = $state()
	let showCardBack = $state(false)	
	let showFront = $state()
	let showBack = $state()
  let lang1lang2 = $state("text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 opacity-100");
	let lang2lang1 = $state("focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 opacity-50");
	let lang1lang1 = $state("focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900 opacity-50")

	const toggleShowBack = () => showCardBack = !showCardBack;

	const updateLang = (lang: string) => {
		langlang = lang
		if (lang === 'japeng'){
			showFront = '日本語'
			showBack = 'English'
			lang1lang2 = twMerge(lang1lang2, 'opacity-100')
			lang2lang1 = twMerge(lang2lang1, 'opacity-50')
			if(isVerb){
				lang1lang1 = twMerge(lang1lang1, 'opacity-50')
			}
		} else if (lang === 'engjap'){
      showFront = 'English'
			showBack = '日本語'
			lang1lang2 = twMerge(lang1lang2, 'opacity-50')
			lang2lang1 = twMerge(lang2lang1, 'opacity-100')
			if(isVerb){
				lang1lang1 = twMerge(lang1lang1, 'opacity-50')
			}
		} else if (lang === 'kanjap'){
			showFront = 'Kanji'
			showBack = 'Hiragana'
			lang1lang2 = twMerge(lang1lang2, 'opacity-50')
			lang2lang1 = twMerge(lang2lang1, 'opacity-50')
			if(isVerb){
				lang1lang1 = twMerge(lang1lang1, 'opacity-100')
			}
		}
		showCardBack = false
    const { front: newFront, back: newBack } = getRandomPair(dictionary, lang, isVerb);
    front = newFront
    back = newBack
  };

	updateLang(langlang);

	function handleKeyDown(event) {
	
    if (event.key === 'ArrowLeft') {
      toggleShowBack();
			// console.log('arrowleft pressed')
    } else if (event.key === 'ArrowRight') {
      updateLang(langlang);
			// console.log('arrowright is pressed')
    }
  }
	
	function preventDefault(fn) {
		return function (event) {
			event.preventDefault();
			fn.call(this, event);
		};
	}
</script>

<div class="flex flex-col items-center mt-15">
	<h1 class="text-3xl m-4">{title}</h1>
	<div class="flex justify-between">
		<button type="button" class="{lang1lang2}" on:click={() => updateLang('japeng')}>Japanese-English</button>
		<button class="{lang2lang1}" on:click={() => updateLang('engjap')}>English-Japanese</button>
		{#if isVerb}
		<button class="{lang1lang1}" on:click={() => updateLang('kanjap')}>Kanji-Hiragana</button>
		{/if}
	</div>
	<!-- FLASHCARD -->
	<div class="flip-box bg-transparent w-full md:w-2/3 h-96">
		<div class="flip-box-inner" class:flip-it={showCardBack}>
			<Flashcard {front} {back} {showCardBack} {pFront} {pBack}/>
		</div>
	</div>

	<!-- BUTTONS -->
	
	<div class="flex space-x-4 pt-4">
		<button 
			onclick={toggleShowBack} 
			class="inline-flex items-center bg-gray-300 p-4"
		>
			{showCardBack ? showFront : showBack}
		</button>
		
		<button 
			class="inline-flex items-center bg-gray-300 p-4" 
			onclick={()=>updateLang(langlang)}
		>
			NEXT
		</button>
	</div>
	<span class="hidden lg:inline-block mt-4 right-full bg-gray-900 text-white px-2 py-1 rounded">
    Use ← to flip and → to next
	</span>
</div>	

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
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	/* Do an horizontal flip on button click */
	.flip-it {
		transform: rotateY(180deg);
	}

</style>
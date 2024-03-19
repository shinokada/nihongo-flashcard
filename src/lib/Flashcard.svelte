<script lang="ts">
	interface Props {
		front?: string;
		back?: string;
		showCardBack?: boolean;
		pFront?: string;
		pBack?: string;
	}

	import { twMerge } from 'tailwind-merge';
	let { front, back, showCardBack, pFront, pBack }: Props = $props();

	const frontDivCls = 'absolute inset-0 bg-custom-red text-white flex justify-center items-center';
	const pClass = 'text-5xl p-8';
	let frontPCls = twMerge(pClass, pFront);
	let backPCls = twMerge(pClass, pBack);
</script>

<div class="relative h-full">
	<div class={frontDivCls}>
		<p class={frontPCls}>{front}</p>
	</div>
	<div
		class="absolute inset-0 flex items-center justify-center bg-custom-blue text-white opacity-0 {showCardBack
			? 'opacity-100 [transform:rotateY(180deg)]'
			: ''}"
	>
		<p class={backPCls}>{@html back}</p>
	</div>
</div>

<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
	
	interface CtxType {
		size: string;
		role?: string;
	}
	interface Props extends SVGAttributes<SVGSVGElement>{
		size?: string;
		role?: string;
		ariaLabel?: string;
	}

	import { getContext } from 'svelte';
	const ctx: CtxType = getContext('iconCtx') ?? {};
	let {
		size = ctx.size || '24',
		role = ctx.role || 'img',
		ariaLabel = 'flag of no',
		...attributes
	}: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	id="flag-icons-no"
	width={size}
	height={size}
	{...attributes}
	{role}
	aria-label={ariaLabel}
	viewBox="0 0 900 600"
>
	<rect fill="#fff" height="600" width="900" />
	<circle fill="#bc002d" cx="450" cy="300" r="180" />
</svg>

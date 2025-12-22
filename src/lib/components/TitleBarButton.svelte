<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		type = 'normal',
		isLast = false,
		onclick,
		children
	}: {
		type?: 'normal' | 'destructive';
		isLast?: boolean;
		onclick?: () => void;
		children: Snippet;
	} = $props();
</script>

<button
	class="{isLast && 'rounded-tr'} px-2 py-1 {type == 'normal'
		? ' hover:bg-gray-400/30'
		: 'hover:bg-red-400'}"
	{onclick}
>
	{@render children()}
</button>

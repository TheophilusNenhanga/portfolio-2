<script lang="ts">
	let {
		type = 'normal',
		isLast = false,
		children
	}: { type?: 'normal' | 'destructive'; isLast?: boolean; children: any } = $props();
</script>

<button
	class="{isLast && 'rounded-tr'} px-2 py-1 {type == 'normal'
		? ' hover:bg-gray-400/30'
		: 'hover:bg-red-400'}"
>
	{@render children()}
</button>

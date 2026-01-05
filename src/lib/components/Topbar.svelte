<script lang="ts">
	import { showDate, showTime } from '$lib/context.svelte';
	let time = $state(new Date().toLocaleTimeString());
	let date = $state(new Date().toLocaleDateString());
	$effect(() => {
		setInterval(() => {
			time = new Date().toLocaleTimeString();
			date = new Date().toLocaleDateString();
		}, 100);
	});
</script>

{#if showDate.current == 'true' || showTime.current == 'true'}
	<div class="fixed flex h-6 w-full items-center justify-center bg-gray-300 select-none">
		<p class="px-4 text-center font-semibold">
			{#if showDate.current == 'true'}
				{date}
			{/if}
			{#if showTime.current == 'true'}
				{time}
			{/if}
		</p>
	</div>
{/if}

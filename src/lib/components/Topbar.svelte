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
	<div class="flex h-6 w-full items-center justify-center bg-gray-300 select-none">
		<p class="rounded-full border px-4 text-center">
			{#if showDate.current == 'true'}
				{date}
			{/if}
			{#if showTime.current == 'true'}
				{time}
			{/if}
		</p>
	</div>
{/if}

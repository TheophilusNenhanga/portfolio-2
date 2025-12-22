<script lang="ts">
	import Portfolio from '$lib/components/screens/Portfolio.svelte';
	import Window from '$lib/components/Window.svelte';
	import { windows, showDate, showTime } from '$lib/context.svelte';

	let time = $state(new Date().toLocaleTimeString());
	let date = $state(new Date().toLocaleDateString());
	$effect(() => {
		setInterval(() => {
			time = new Date().toLocaleTimeString();
			date = new Date().toLocaleDateString();
		}, 100);
	});
</script>

<main class="relative hidden h-screen max-h-screen overflow-x-clip lg:block">
	{#if showDate.current == 'true' || showTime.current == 'true'}
		<div class="flex h-6 w-full items-center justify-center bg-gray-300">
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
	{#each windows as window (window.id)}
		<Window
			title={window.name}
			width={window.width}
			height={window.height}
			left={window.left}
			top={window.top}
			z={window.zIndex}
			id={window.id}
			hasFocus={window.hasFocus}
		>
			{#if window.component}
				<window.component />
			{/if}
		</Window>
	{/each}
	<div class="fixed bottom-0 flex h-12 w-full bg-gray-200">
		{#each windows as window (window.id)}
			{#if window.openState !== 'closed'}
				<button
					class="flex cursor-pointer items-center justify-center px-4 hover:bg-gray-400"
					onclick={() => {}}
				>
					<img src={window.icon} alt={window.name} class="h-8 w-8" />
				</button>
			{/if}
		{/each}
	</div>
</main>

<main class="lg:hidden">
	<Portfolio />
</main>

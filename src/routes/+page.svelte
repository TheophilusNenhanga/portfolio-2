<script lang="ts">
	import Portfolio from '$lib/components/screens/Portfolio.svelte';
	import Window from '$lib/components/Window.svelte';
	import {
		windows,
		showDate,
		showTime,
		windowMinimize,
		windowUnMinimize
	} from '$lib/context.svelte';

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
		{#if window.openState === 'open' || window.openState === 'maximized'}
			<Window id={window.id}>
				{#if window.component}
					<window.component />
				{/if}
			</Window>
		{/if}
	{/each}
	<div class="fixed bottom-0 flex h-14 w-full border-t border-gray-600 bg-gray-200">
		{#each windows as window (window.id)}
			{#if window.openState !== 'closed'}
				<button
					class="flex cursor-pointer flex-col items-center justify-center gap-0 px-4 transition-all duration-200 hover:bg-gray-400 {window.hasFocus &&
						'bg-gray-300'}"
					onclick={() => {
						if (window.openState === 'open' || window.openState === 'maximized') {
							windowMinimize(window.id);
						} else if (window.openState === 'minimized') {
							windowUnMinimize(window.id);
						}
					}}
				>
					<img src={window.icon} alt={window.name} class="h-6 w-6" />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="12"
						viewBox="0 6 24 12"
						fill="none"
						stroke={window.openState === 'open' ? 'blue' : 'currentColor'}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M5 12h14" /></svg
					>
				</button>
			{/if}
		{/each}
	</div>
</main>

<main class="lg:hidden">
	<Portfolio />
</main>

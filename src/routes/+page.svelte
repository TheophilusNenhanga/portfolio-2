<script lang="ts">
	import Portfolio from '$lib/components/screens/Portfolio.svelte';
	import Taskbar from '$lib/components/Taskbar.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import Window from '$lib/components/Window.svelte';
	import { windows } from '$lib/context.svelte';
</script>

<main class="relative hidden h-screen max-h-screen overflow-x-clip lg:block">
	<Topbar />
	{#each windows as window (window.id)}
		{#if window.openState === 'open' || window.openState === 'maximized'}
			<Window id={window.id}>
				{#if window.component}
					<window.component />
				{/if}
			</Window>
		{/if}
	{/each}
	<Taskbar />
</main>
<main class="lg:hidden">
	<Portfolio />
</main>

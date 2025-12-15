<script lang="ts">
	import Portfolio from '$lib/components/screens/Portfolio.svelte';
	import Settings from '$lib/components/screens/settings.svelte';
	import Window from '$lib/components/Window.svelte';
</script>

<main class="relative">
	<Window title="Greeting" width={400} height={100} left={20} top={100}>
		<Portfolio />
	</Window>
	<Window title="Settings" width={300} height={500} left={70} top={500}>
		<Settings />
	</Window>
</main>

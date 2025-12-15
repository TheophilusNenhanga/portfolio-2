<script lang="ts">
	import Window from '$lib/components/Window.svelte';
</script>

<main class="relative">
	<Window title="Greeting" width={400} height={100} left={20} top={100}>
		<div class="text-center">
			<h1 class="text-xl">Hi there, I'm Theophilus.</h1>
			<p>Nice to finally meet you</p>
		</div>
	</Window>
	<Window title="Settings" width={300} height={500} left={70} top={500} />
</main>

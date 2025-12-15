<script lang="ts">
	let { color }: { color: 'red' | 'green' | 'amber' } = $props();
	let finalColor = $state('');
	if (color === 'red') {
		finalColor = '--color-red-500';
	} else if (color === 'green') {
		finalColor = '--color-green-500';
	} else if (color === 'amber') {
		finalColor = '--color-amber-500';
	}
</script>

{#if finalColor != ''}
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			stroke="var({finalColor})"
			fill="var({finalColor})"
			stroke-width="0"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10" /></svg
		>
	</div>
{/if}

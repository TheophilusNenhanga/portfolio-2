<script lang="ts">
	let { color, onclick }: { color: 'red' | 'green' | 'amber'; onclick: () => void } = $props();
	let finalColor = $state('');
	let ariaLabel = $state('');
	if (color === 'red') {
		ariaLabel = 'Close Window';
		finalColor = '--color-red-500';
	} else if (color === 'green') {
		finalColor = '--color-green-500';
		ariaLabel = 'Maximize / Restore Window';
	} else if (color === 'amber') {
		finalColor = '--color-amber-500';
		ariaLabel = 'Minimize Window';
	}
</script>

{#if finalColor != ''}
	<button {onclick} class="cursor-pointer" aria-label={ariaLabel}>
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
	</button>
{/if}

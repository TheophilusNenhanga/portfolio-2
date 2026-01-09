<script lang="ts">
	let { color, onclick }: { color: 'red' | 'green' | 'amber'; onclick: () => void } = $props();

	const colorData = $derived.by(() => {
		if (color === 'red') {
			return {
				ariaLabel: 'Close Window',
				finalColor: '--color-red-500'
			};
		} else if (color === 'green') {
			return {
				finalColor: '--color-green-500',
				ariaLabel: 'Maximize / Restore Window'
			};
		} else if (color === 'amber') {
			return {
				finalColor: '--color-amber-500',
				ariaLabel: 'Minimize Window'
			};
		} else {
			return {
				finalColor: '--color-gray-500',
				ariaLabel: 'Unknown'
			};
		}
	});
</script>

{#if colorData.finalColor != ''}
	<button {onclick} class="cursor-pointer" aria-label={colorData.ariaLabel}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			stroke="var({colorData.finalColor})"
			fill="var({colorData.finalColor})"
			stroke-width="0"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10" /></svg
		>
	</button>
{/if}

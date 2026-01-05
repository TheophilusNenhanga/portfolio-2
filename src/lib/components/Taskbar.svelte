<script lang="ts">
	import { windows, windowOpen, windowMinimize, windowUnMinimize } from '$lib/context.svelte';
</script>

<div class="fixed bottom-0 flex h-14 w-full border-t border-gray-400 bg-gray-200 px-2 py-1">
	{#each windows as w (w.id)}
		<button
			class="group flex cursor-pointer items-center justify-center gap-2 rounded px-4 transition-all duration-200 hover:bg-gray-400 {windows[
				w.id
			].hasFocus &&
				windows[w.id].openState !== 'closed' &&
				'bg-gray-300'}"
			onclick={() => {
				if (w.openState === 'open') {
					windowMinimize(w.id);
				} else if (w.openState === 'minimized') {
					windowUnMinimize(w.id);
				} else if (w.openState === 'closed') {
					windowOpen(w.id);
				}
			}}
		>
			<div
				class="flex flex-col items-center justify-center transition-all duration-100 group-active:scale-80"
			>
				<img src={w.icon} alt={w.name} aria-label={w.name + 'task bar icon'} class="h-6 w-6" />
				{#if w.openState === 'open' || w.openState === 'maximized'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="12"
						viewBox="0 6 24 12"
						fill="none"
						stroke="blue"
						class="-mb-2 scale-150 transition-all duration-200"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M5 12h14" /></svg
					>
				{:else if w.openState === 'minimized'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="12"
						viewBox="0 6 24 12"
						fill="none"
						stroke="gray"
						stroke-width="2"
						class="-mb-2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M5 12h14" /></svg
					>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="12"
						class="-mb-2"
						viewBox="0 6 24 12"
						fill="none"
						stroke="none"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M5 12h14" /></svg
					>
				{/if}
			</div>

			<span>
				{w.name}
			</span>
		</button>
	{/each}
</div>

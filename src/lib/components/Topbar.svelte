<script lang="ts">
	import { showDate, showTime } from '$lib/context.svelte';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { slide } from 'svelte/transition';

	let value = $state(today(getLocalTimeZone()));
	let time = $state(new Date().toLocaleTimeString());
	let date = $state(new Date().toLocaleDateString());
	let calendar = $state(false);

	let containerRef: HTMLDivElement | null = $state(null);
	let buttonRef: HTMLButtonElement | null = $state(null);

	$effect(() => {
		let interval = setInterval(() => {
			time = new Date().toLocaleTimeString();
			date = new Date().toLocaleDateString();
		}, 100);
		return () => {
			clearInterval(interval);
		};
	});

	function handleClick() {
		calendar = !calendar;
	}

	$effect(() => {
		if (!calendar) return;

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Node;
			if (
				containerRef &&
				!containerRef.contains(target) &&
				buttonRef &&
				!buttonRef.contains(target)
			) {
				calendar = false;
			}
		}
		setTimeout(() => {
			document.addEventListener('click', handleClickOutside);
		}, 0);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

{#if showDate.current == 'true' || showTime.current == 'true'}
	<div class="fixed z-20 flex h-6 w-full items-center justify-center bg-gray-300 select-none">
		{#if calendar}
			<div
				bind:this={containerRef}
				class="absolute top-6 z-30 rounded-md border-2 border-blue-600/70"
				transition:slide={{ duration: 300 }}
			>
				<Calendar
					type="single"
					bind:value
					class="rounded-md border bg-gray-200 shadow-sm"
					captionLayout="label"
				/>
			</div>
		{/if}
		<button
			bind:this={buttonRef}
			class="cursor-pointer px-4 text-center font-semibold"
			onclick={handleClick}
		>
			{#if showDate.current == 'true'}
				{date}
			{/if}
			{#if showTime.current == 'true'}
				{time}
			{/if}
		</button>
	</div>
{/if}

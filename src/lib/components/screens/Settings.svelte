<script lang="ts">
	import { showTitles, windowControlPosition, windowControlStyle } from '$lib/context';

	const titlesContent = [
		{ value: 'true', label: 'true' },
		{ value: 'false', label: 'false' }
	];

	const controlStyleContent = [
		{ value: 'windows', label: 'Windows style' },
		{ value: 'macos', label: 'MacOS Style' }
	];

	const controlPositionContent = [
		{ value: 'left', label: 'Left' },
		{ value: 'right', label: 'Right' }
	];

	let titleValue = $state(showTitles.current);
	let controlStyleValue = $state(windowControlStyle.current);
	let controlPositionValue = $state(windowControlPosition.current);

	function updateWindowTitles() {
		showTitles.current = titleValue;
	}

	function updateControlStyle() {
		windowControlStyle.current = controlStyleValue;
	}

	function updateControlPosition() {
		windowControlPosition.current = controlPositionValue;
	}

	function updateSettings() {
		updateControlPosition();
		updateControlStyle();
		updateWindowTitles();
	}
</script>

<div class="flex flex-col gap-4 px-2 py-1">
	<h2 class="text-xl font-bold">Settings</h2>
	<div class="flex flex-col gap-2">
		<label> Should window titles be visible </label>
		<select name="titleSeclect" id="titleSelect" bind:value={titleValue}>
			{#each titlesContent as content (content.value)}
				<option value={content.value}>{content.label}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-2">
		<label> What style of window controls should be used </label>
		<select
			class="cursor-pointer"
			name="controlStyleSelect"
			id="constrolStyleSelect"
			bind:value={controlStyleValue}
		>
			{#each controlStyleContent as content (content.value)}
				<option value={content.value}>{content.label}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-2">
		<label> Where should window controls be positioned? </label>
		<select
			name="controlPositionSelect"
			id="constrolPositionSelect"
			bind:value={controlPositionValue}
		>
			{#each controlPositionContent as content (content.value)}
				<option value={content.value}>{content.label}</option>
			{/each}
		</select>
	</div>
	<button class=" w-fit rounded-sm border border-black px-2 py-1" onclick={updateSettings}
		>Save Changes
	</button>
</div>

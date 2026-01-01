<script lang="ts">
	import {
		showTitles,
		windowControlPosition,
		windowControlStyle,
		showTime,
		showDate
	} from '$lib/context.svelte';

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

	const controlShowDateContent = [
		{ value: 'true', label: 'true' },
		{ value: 'false', label: 'false' }
	];

	const controlShowTimeContent = [
		{ value: 'true', label: 'true' },
		{ value: 'false', label: 'false' }
	];

	let titleValue = $state(showTitles.current);
	let controlStyleValue = $state(windowControlStyle.current);
	let controlPositionValue = $state(windowControlPosition.current);
	let showTimeValue = $state(showTime.current);
	let showDateValue = $state(showDate.current);

	function updateWindowTitles() {
		showTitles.current = titleValue;
	}

	function updateControlStyle() {
		windowControlStyle.current = controlStyleValue;
	}

	function updateControlPosition() {
		windowControlPosition.current = controlPositionValue;
	}

	function updateShowTime() {
		showTime.current = showTimeValue;
	}

	function updateShowDate() {
		showDate.current = showDateValue;
	}

	function updateSettings() {
		updateControlPosition();
		updateControlStyle();
		updateWindowTitles();
		updateShowTime();
		updateShowDate();
	}
</script>

<div class="flex flex-col gap-4 px-2 py-1 select-none">
	<h2 class="text-xl font-bold">Settings</h2>

	<h3>Windows</h3>

	<div class="flex flex-col gap-2">
		<label for="titleSelect"> Should window titles be visible </label>
		<select name="titleSeclect" id="titleSelect" bind:value={titleValue}>
			{#each titlesContent as content (content.value)}
				<option value={content.value}>{content.label}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-2">
		<label for="controlStyleSelect"> What style of window controls should be used </label>
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
		<label for="controlPositionSelect"> Where should window controls be positioned? </label>
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

	<div class="h-px w-full bg-gray-600"></div>

	<h3>Desktop</h3>

	<div class="flex flex-col gap-2">
		<label for="">Show time</label>
		<select name="showTimeSelect" id="showTimeSelect" bind:value={showTimeValue}>
			{#each controlShowTimeContent as content (content.value)}
				<option value={content.value}>{content.label}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col gap-2">
		<label for="">Show Date</label>
		<select name="showDateSelect" id="showDateSelect" bind:value={showDateValue}>
			{#each controlShowDateContent as content (content.value)}
				<option value={content.value}>{content.label}</option>
			{/each}
		</select>
	</div>

	<button class=" w-fit rounded-sm border border-black px-2 py-1" onclick={updateSettings}
		>Save Changes
	</button>
</div>

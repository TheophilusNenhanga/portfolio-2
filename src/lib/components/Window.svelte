<script lang="ts">
	let {
		title,
		left,
		top,
		width,
		height,
		children
	}: { title: string; left: number; top: number; width: number; height: number; children?: any } =
		$props();
	import TitleBarButton from './TitleBarButton.svelte';
	import { Square, X, Minus } from '@lucide/svelte';
	import { showTitles, windowControlPosition, windowControlStyle } from '$lib/context';
	import TitleBarDot from './TitleBarDot.svelte';

	let dragging = $state(false);
	let currentLeft = $state(left);
	let currentTop = $state(top);
	let dragStartX = $state(0);
	let dragStartY = $state(0);
	let initialLeft = $state(0);
	let initialTop = $state(0);

	function onDoubleClickTitleBar(event: MouseEvent) {
		if (event.button !== 0) return;
		dragging = true;
		dragStartX = event.clientX;
		dragStartY = event.clientY;
		initialLeft = currentLeft;
		initialTop = currentTop;
	}

	$effect(() => {
		function onMouseMove(event: MouseEvent) {
			if (!dragging) return;

			const deltaX = event.clientX - dragStartX;
			const deltaY = event.clientY - dragStartY;

			currentLeft = initialLeft + deltaX;
			currentTop = initialTop + deltaY;
		}

		function onMouseUp() {
			if (dragging) {
				dragging = false;
			}
		}

		if (dragging) {
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);

			return () => {
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);
			};
		}
	});
</script>

<div
	class="absolute rounded-md border bg-gray-200"
	style="left:{currentLeft}px; top:{currentTop}px;"
>
	<div
		role="button"
		tabindex="0"
		class="flex w-full justify-between rounded-t-sm bg-gray-500 {windowControlPosition.current ===
			'left' && 'flex-row-reverse'}"
		onmousedown={onDoubleClickTitleBar}
	>
		<div class="flex items-center justify-center select-none">
			{#if showTitles.current == 'true'}
				<small class="px-2 text-white">{title}</small>
			{/if}
		</div>
		{#if windowControlStyle.current == 'windows'}
			<ul class="flex text-white last:rounded-tr-sm">
				<TitleBarButton><Minus strokeWidth={1} /></TitleBarButton>
				<TitleBarButton><Square strokeWidth={1} size={18} /></TitleBarButton>
				<TitleBarButton type="destructive" isLast={true}><X strokeWidth={1} /></TitleBarButton>
			</ul>
		{:else}
			<ul class="mx-2 flex gap-1 py-1">
				<TitleBarDot color="red" />
				<TitleBarDot color="amber" />
				<TitleBarDot color="green" />
			</ul>
		{/if}
	</div>
	<article
		class="h-min overflow-y-scroll overscroll-none"
		style=" width:{width}px; max-height:{height}px;"
	>
		{@render children?.()}
	</article>
</div>

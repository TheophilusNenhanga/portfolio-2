<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		id,
		children
	}: {
		id: number;
		children?: Snippet;
	} = $props();
	import TitleBarButton from './TitleBarButton.svelte';
	import {
		windows,
		showTitles,
		windowControlPosition,
		windowControlStyle,
		setFocus,
		windowMaximize,
		windowMinimize,
		windowRestore,
		windowClose,
		startTop,
		showDate,
		showTime,
		endTop,
		topBarHeight
	} from '$lib/context.svelte';
	import TitleBarDot from './TitleBarDot.svelte';

	let thisWindow = $derived(windows[id]);

	let dragging = $state(false);
	let currentLeft = $derived(thisWindow.left);
	let currentTop = $derived(thisWindow.top);
	let dragStartX = $state(0);
	let dragStartY = $state(0);
	let initialLeft = $state(0);
	let initialTop = $state(0);

	function onDoubleClickTitleBar(event: MouseEvent) {
		if (event.button !== 0) return;
		setFocus(id);
		dragging = true;
		dragStartX = event.clientX;
		dragStartY = event.clientY;
		initialLeft = thisWindow.left;
		initialTop = thisWindow.top;
	}

	$effect(() => {
		function onMouseMove(event: MouseEvent) {
			if (!dragging) return;

			const deltaX = event.clientX - dragStartX;
			const deltaY = event.clientY - dragStartY;

			let newLeft = initialLeft + deltaX;
			let newTop = initialTop + deltaY;

			if (newLeft < 0) {
				newLeft = 0;
			}

			if (newTop < 0) {
				newTop = 0;
			}

			if ((showDate.current == 'true' || showTime.current == 'true') && newTop < startTop) {
				newTop = startTop;
			}

			if (newLeft + thisWindow.width > window.innerWidth) {
				newLeft = window.innerWidth - thisWindow.width;
			}

			if (newTop + thisWindow.height > window.innerHeight - endTop) {
				newTop = window.innerHeight - thisWindow.height - endTop;
			}

			windows[id].left = newLeft;
			windows[id].top = newTop;
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
	class="absolute rounded-md border bg-gray-200 {thisWindow.hasFocus
		? 'border-2 border-blue-600/70'
		: 'border-2 border-gray-400/50'}"
	style="width:{thisWindow.width}px; height:{thisWindow.height}px; left:{currentLeft}px; top:{currentTop}px; z-index:{thisWindow.zIndex};"
>
	<div
		role="button"
		tabindex="0"
		class="flex h-6 w-full justify-between rounded-t-sm bg-gray-500 select-none {windowControlPosition.current ===
			'left' && 'flex-row-reverse'}"
		onmousedown={onDoubleClickTitleBar}
	>
		<div class="flex items-center justify-center select-none">
			{#if showTitles.current == 'true'}
				<small class="px-2 text-white">{thisWindow.name}</small>
			{/if}
		</div>
		{#if windowControlStyle.current == 'windows'}
			<ul class="flex text-white last:rounded-tr-sm">
				<TitleBarButton
					onclick={() => {
						windowMinimize(id);
					}}
					><svg
						width="10"
						height="10"
						viewBox="0 0 10 10"
						xmlns="http://www.w3.org/2000/svg"
						shape-rendering="crispEdges"
					>
						<line x1="0" y1="5.5" x2="10" y2="5.5" stroke="currentColor" />
					</svg></TitleBarButton
				>
				{#if windows[id].openState == 'maximized'}
					<TitleBarButton
						onclick={() => {
							windowRestore(id);
						}}
					>
						<svg
							width="10"
							height="10"
							viewBox="0 0 10 10"
							xmlns="http://www.w3.org/2000/svg"
							shape-rendering="crispEdges"
						>
							<path d="M2.5 0.5H9.5V7.5" fill="none" stroke="currentColor" />
							<rect x="0.5" y="2.5" width="7" height="7" fill="none" stroke="currentColor" />
						</svg>
					</TitleBarButton>
				{:else}
					<TitleBarButton
						onclick={() => {
							windowMaximize(id, window);
						}}
						><svg
							width="10"
							height="10"
							viewBox="0 0 10 10"
							xmlns="http://www.w3.org/2000/svg"
							shape-rendering="crispEdges"
						>
							<rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" />
						</svg></TitleBarButton
					>
				{/if}
				<TitleBarButton
					type="destructive"
					isLast={true}
					onclick={() => {
						windowClose(id);
					}}
					><svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" stroke-width="1" />
					</svg></TitleBarButton
				>
			</ul>
		{:else}
			<ul class="mx-2 flex gap-1 py-1">
				<TitleBarDot
					color="red"
					onclick={() => {
						windowClose(id);
					}}
				/>
				<TitleBarDot
					color="amber"
					onclick={() => {
						windowMinimize(id);
					}}
				/>
				<TitleBarDot
					color="green"
					onclick={() => {
						if (windows[id].openState === 'maximized') {
							windowRestore(id);
						} else {
							windowMaximize(id, window);
						}
					}}
				/>
			</ul>
		{/if}
	</div>
	<div
		role="button"
		tabindex="0"
		class="overflow-y-scroll overscroll-none rounded-b-md"
		style="height:{thisWindow.height - topBarHeight}px;"
		onmouseup={() => {
			setFocus(id);
		}}
	>
		{@render children?.()}
	</div>
</div>

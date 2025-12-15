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
</script>

<div class="absolute rounded-md border bg-gray-200" style="left:{left}px; top:{top}px;">
	<div
		class="flex w-full justify-between rounded-t-sm bg-gray-500 {windowControlPosition.current ===
			'left' && 'flex-row-reverse'} "
	>
		<div class="flex items-center justify-center">
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

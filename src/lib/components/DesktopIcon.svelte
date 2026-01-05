<script lang="ts">
	let {
		icon,
		name,
		onDoubleClick
	}: {
		icon: string;
		name: string;
		onDoubleClick: () => void;
	} = $props();

	function handleDblClick() {
		onDoubleClick();
	}
</script>

<button
	class="flex cursor-pointer flex-col items-center justify-center rounded transition-colors hover:bg-white/20"
	ondblclick={handleDblClick}
>
	<img src={icon} alt="{name} icon" class="max-h-full max-w-full scale-125" />
	<span class="max-w-full truncate text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
		{name}
	</span>
</button>

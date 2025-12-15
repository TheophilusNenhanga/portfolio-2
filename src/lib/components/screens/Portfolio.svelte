<script lang="ts">
	import { Github, Linkedin } from '@lucide/svelte';
</script>

<div class="flex flex-col gap-4 rounded-b-md bg-gray-800 px-2 py-1 text-white">
	<div id="name">
		<h1 class="text-2xl font-bold">Theophilus Nenhanga</h1>
		<h2 class="font-semibold">... Developer</h2>
		<p class="">I build accessible experiences for the web.</p>
	</div>

	<div id="links" class="flex gap-4">
		<a class="flex" href="https://github.com/TheophilusNenhanga"><Github />↗</a>
		<a class="flex" href="https://www.linkedin.com/in/theophilus-nenhanga/"><Linkedin />↗</a>
	</div>

	<div id="about"></div>

	<div id="experience">
		<h3 class="font-bold">Experience</h3>
		<p>zu internship</p>
	</div>

	<div id="projects">
		<h3 class="font-bold">Projects</h3>
		<p>crux lang</p>
		<p>flora engine</p>
	</div>

	<div id="other">
		<h3 class="font-bold">Other</h3>
		<p>learning japanese</p>
		<p>reading</p>
	</div>
</div>

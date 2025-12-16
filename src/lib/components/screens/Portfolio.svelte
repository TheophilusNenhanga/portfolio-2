<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
</script>

<div class="flex flex-col gap-4 rounded-b-md bg-gray-800 px-2 py-1 text-white">
	<div id="name">
		<h1 class="text-2xl font-bold">Theophilus Nenhanga</h1>
		<h2 class="font-semibold">... Developer</h2>
		<p class="">I build accessible experiences for the web.</p>
	</div>

	<div id="links" class="flex items-center gap-4">
		<a class="flex" href="https://github.com/TheophilusNenhanga" aria-label="github icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="h-6 w-6"
				aria-hidden="true"
				><path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
				></path></svg
			>
		</a>
		<a
			class="flex"
			href="https://www.linkedin.com/in/theophilus-nenhanga/"
			aria-label="linkedin icon"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="h-7 w-7"
				aria-hidden="true"
				><path
					d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
				></path></svg
			>
		</a>
	</div>

	<div id="about"></div>

	<div id="experience">
		<h3 class="font-bold">Experience</h3>
		<div>
			<h4 class="font-bold">Intern Web Developer <span>@ <a href="https://zu.com">zu</a></span></h4>
			<small class="text-gray-400">September 2024 - September 2025</small>
			<p>Whatever I did at zu</p>
			<div class="flex flex-wrap gap-1">
				<Badge>PHP</Badge>
				<Badge>Drupal</Badge>
				<Badge>Symfony</Badge>
				<Badge>Astro</Badge>
				<Badge>Typescript</Badge>
			</div>
		</div>
	</div>

	<div class="h-px w-full bg-gray-300"></div>

	<div id="projects" class="flex flex-col gap-4">
		<h3 class="font-bold">Projects</h3>
		<div>
			<h4>Crux Lang</h4>
			<p>Whatever Crux Lang is about</p>
			<div class="flex flex-wrap gap-1">
				<Badge>C</Badge>
				<Badge>#Programming Language</Badge>
			</div>
		</div>
		<div>
			<h4>Flora Engine</h4>
			<p>Whatever Flora Engine is about</p>
			<div class="flex flex-wrap gap-1">
				<Badge>C</Badge>
				<Badge>SDL3</Badge>
				<Badge>#UI Framework</Badge>
			</div>
		</div>
	</div>

	<div class="h-px w-full bg-gray-300"></div>

	<div id="other">
		<h3 class="font-bold">Other</h3>
		<p>learning japanese</p>
		<p>reading</p>
	</div>
</div>

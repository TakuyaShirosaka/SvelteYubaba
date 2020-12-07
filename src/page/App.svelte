<script lang="ts">
	import { onMount } from "svelte";
	import Document from "./Document.svelte";

	// const
	const hello: string = "契約書だよ。<br>そこに名前を書きな。";

	// Vue.js neary mounted
	onMount(() => {
		console.log("☆onAppMounted☆");
	});
</script>

<style>

	header .hello_h1 {
		text-align: center;
		color: #f70202;
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: bold;
	}

	header nav {
		text-align: center;
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: 100;
		font-style: italic;
	}

	main.hello_main {
		text-align: center;
		max-width: 350px;
		margin: auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<header>
	<nav >
		<p><a href="./about.html"><u>これは何？</u></a></p>
	</nav>
	<h1 class="hello_h1">
		{@html hello}
	</h1>
</header>

<main class="hello_main">
	<Document props_header="※イメージ" />
</main>

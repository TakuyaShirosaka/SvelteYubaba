<script lang="ts">
	import { onMount } from "svelte";
	import { time } from "../store/stores";

	const formatter = new Intl.DateTimeFormat("jp", {
		hour12: true,
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
	});

	const src = "img/hero_line_red.png";
	let description_visible = false;
	const handleMouseenter = () => (description_visible = true);
	const handleMouseleave = () => (description_visible = false);

	// Vue.js neary mounted
	onMount(() => {
		console.log("☆onAboutMounted☆");
	});
</script>

<style>
	main {
		width: 100%;
		min-height: 100vh;
		overflow-x: hidden;
		background-image: radial-gradient(#f7e8e8 15%, transparent 15%);
		background-size: 22px 22px;
		position: relative;
		z-index: 0;
	}

	div {
		position: absolute;
		left: 50px;
		font-size: 1em;
		transform: translate(-300%, 0) rotate(-30deg);
		transform-origin: 100% 100%;
		transition: transform 0.4s;
	}

	img {
		width: 60vw;
		height: 15.33vw;
		transform: translate(80%, 0) rotate(-30deg);
	}

	.curious {
		transform: translate(0%, 0) rotate(0deg);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
		div {
			font-size: 2em;
		}
	}
</style>

<!-- Bodyに対するイベント -->
<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave} />

<main>
	<h3>ただいま {formatter.format($time)}</h3>
	<img alt="" src="../img/hero_line_red.png" />
	<div class:curious={description_visible}>
		<p>
			こんにちは、<br />完全に湯婆婆ネタに便乗しました。<br />Svelteで実装しています。
		</p>
		<p><a href="https://qiita.com/P3117"><u>Qiitaのプロフィール</u></a></p>
		<p>
			<a href="https://github.com/TakuyaShirosaka/SvelteYubaba"><u>Githubのリポジトリ</u></a>
		</p>
		<p><a href="./"><u>戻る</u></a></p>
	</div>
</main>

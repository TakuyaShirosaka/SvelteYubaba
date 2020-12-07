<script lang="ts">
	import { onMount } from "svelte";
	import Confirm from "./Confirm.svelte";

	// props
	export let props_header;

	// const
	const src = "img/document.png";

	// reactive
	let myName = "";
	let visible = false;
	let input_disabled = false;

	function inputValidate(e: FocusEvent) {
		const target: HTMLInputElement = e.target as HTMLInputElement;
		const value: string = target.value;
		console.dir("inputValidate-value:" + target.value);

		if (value.length > 0) {
			visible = true;
		} else {
			visible = false;
		}
	}

	// action listener
	$: if (myName.length >= 10) {
		alert(`長い！`);
		myName = myName.substr(0, 9);
	}

	// component events namingClicked
	function reception_end(event: CustomEvent) {
		console.log("reception_end");
		console.log(event.detail.message);
		input_disabled = !input_disabled;
	}

	function name_modifying(event: CustomEvent) {
		console.log("name_modifying");
		console.log(event.detail.name);
		myName = event.detail.name;
	}

	// Vue.js neary mounted
	onMount(() => {
		console.log("☆onDocument-Mounted☆");
	});
</script>

<style>
	.hello_div {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
	}

	.hello_div .hello_img {
		right: 0px;
		top: 0px;
		max-width: 300px;
	}

	.hello_div .hello_span_header {
		position: absolute;
		text-align: center;
		font-size: 1em;
		font-family: "Meiryo UI", "Wawati SC", "ヒラギノ角ゴシック",
			"Hiragino Sans", sans-serif;
		left: 30px;
		top: 10px;
	}

	.hello_div .hello_span_title {
		position: absolute;
		text-align: center;
		font-size: 0.8em;
		font-family: "Meiryo UI", "Wawati SC", "ヒラギノ角ゴシック",
			"Hiragino Sans", sans-serif;
		left: 90px;
		top: 45px;
	}

	.hello_div .hello_span_myName {
		position: absolute;
		text-align: center;
		font-family: "Meiryo UI", "Wawati SC", "ヒラギノ角ゴシック",
			"Hiragino Sans", sans-serif;
		left: 100px;
		top: 65px;
	}

	.confirm_btn {
		text-align: center;
		max-width: 300px;
		margin: 30px auto;
	}

	.input_disabled {
		display: none;
	}
</style>

<div class:input_disabled>
	<span>→</span>
	<input
		disabled={input_disabled}
		placeholder="ここに名前を書きな。"
		bind:value={myName}
		on:blur={inputValidate} />
	<span>←</span>
</div>

<div class="hello_div">
	<img {src} class="hello_img" alt="document" />
	<span class="hello_span_header">{props_header}</span>
	<span class="hello_span_title">(名前)</span>
	<span class="hello_span_myName">{myName}</span>
</div>

{#if visible}
	<div class="confirm_btn">
		<Confirm
			props_myName={myName}
			on:namingClicked={reception_end}
			on:nameDetermining={name_modifying} />
	</div>
{/if}

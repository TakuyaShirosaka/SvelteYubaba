<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { fade, fly, slide } from "svelte/transition";
	import type {
		Confirm_dispatch,
		MyName_OneCharacter,
	} from "../modules/Confirm/inteface";

	// props
	export let props_myName: string;

	// component events
	const confirm_dispatch: <EventKey extends
		| "namingClicked"
		| "nameDetermining">(
		type: EventKey,
		detail?: Confirm_dispatch[EventKey]
	) => void = createEventDispatcher<Confirm_dispatch>();

	// const
	const finish: string = "書きました。。。。";

	// reactive
	let finish_btn_disabled: boolean = false;
	let myName_char_array: MyName_OneCharacter[] = [];

	let name_confirmation_visible: boolean = false;
	let result_visible: boolean = false;

	// computed
	let newName: string = "";
	$: computedNewName = "[" + newName + "]";

	// Vue.js neary mounted
	onMount(() => {
		console.log("☆onConfirm-Mounted☆");
	});

	const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	async function naming() {
		console.dir("naming-s");
		finish_btn_disabled = !finish_btn_disabled;

		// component events namingClicked
		confirm_dispatch("namingClicked", {
			message: "もう編集できませんよ。",
		});

		const myname_array = await seikei().then(async (res) => {
			name_confirmation_visible = !name_confirmation_visible;
			await _sleep(3000);
			return res;
		});

		// component events nameDetermining
		confirm_dispatch("nameDetermining", {
			name: await characterExcerpt(myname_array),
		});

		name_confirmation_visible = !name_confirmation_visible;
		result_visible = !result_visible;
		console.dir("naming-e");
	}

	async function seikei() {
		console.dir("seikei-s");
		const myname: Array<string> = props_myName.replace(" ", "").split("");
		return new Promise<MyName_OneCharacter[]>(async (resolve, reject) => {
			for (const str of myname) {
				const myname_char: MyName_OneCharacter = {
					char: str,
					visible: false,
				};
				myName_char_array = [...myName_char_array, myname_char];
				await _sleep(1500);
			}
			console.dir("seikei-e");
			resolve(myName_char_array);
		});
	}

	async function characterExcerpt(
		myname_array: MyName_OneCharacter[]
	): Promise<string> {
		const newName_index = Math.floor(Math.random() * myname_array.length);
		newName = myName_char_array[newName_index].char as string;
		await changeVisible(newName_index);
		return myName_char_array[newName_index].char as string;
	}

	function changeVisible(newName_index: Number) {
		return new Promise<void>(async (resolve) => {
			for (const [index] of myName_char_array.entries()) {
				if (index != newName_index) {
					myName_char_array[index].visible = true;
				}
			}
			resolve();
		});
	}
</script>

<style scoped>
	h1 {
		text-align: center;
		color: #ff0000;
		text-transform: uppercase;
		font-size: 0.9em;
		font-weight: bold;
	}

	li {
		margin: 10px auto;
		font-size: 1em;
		list-style: none;
	}

	li.visible {
		display: none;
	}

	.btn_disabled {
		display: none;
	}

	span::before {
		content: "\A";
		white-space: pre;
	}
</style>

<div
	class:btn_disabled={finish_btn_disabled}
	in:fly={{ y: 200, duration: 2000 }}
	out:fade>
	<button
		type="button"
		name="confirm"
		on:click={naming}
		disabled={finish_btn_disabled}>
		{finish}</button>
</div>

{#each myName_char_array as myName_OneCharacter}
	<li
		class:visible={myName_OneCharacter.visible}
		in:fly={{ y: 200, duration: 2000 }}
		out:slide>
		{myName_OneCharacter.char}
	</li>
{/each}

<h1>
	{#if name_confirmation_visible}
		<p>
			<span>フン。 [{props_myName}] というのかい。</span>
			<span>贅沢な名だねぇ。</span>
		</p>
	{:else if result_visible}
		<p>
			<span>今からお前の名前は{computedNewName}だ。</span>
			<span>いいかい、{computedNewName}だよ。</span>
			<span>分かったら返事をするんだ、{computedNewName}!!</span>
		</p>
	{/if}
</h1>

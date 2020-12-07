import About from './page/About.svelte';

const about = new About({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default about;
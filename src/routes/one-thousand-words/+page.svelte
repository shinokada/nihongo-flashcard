<script>
	import { FlashcardPage } from '$lib';
	import dictionary from '$lib/data/nouns.json';
</script>

<FlashcardPage {dictionary} title="1000 Japanese basic words" isVerb={true} />

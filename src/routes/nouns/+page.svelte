<script>
  import { FlashcardPage } from "$lib"
  import dictionary from '$lib/data/nouns.json';  
</script>

<FlashcardPage {dictionary} title="名詞 Nouns" isVerb={true}/>
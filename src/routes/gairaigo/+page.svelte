<script>
  import { FlashcardPage } from "$lib"
  import dictionary from '$lib/data/gairaigo.json';  
</script>

<FlashcardPage {dictionary} title="外来語 Gairaigo" pFront="text-3xl text-left" pBack="text-3xl text-left"/>
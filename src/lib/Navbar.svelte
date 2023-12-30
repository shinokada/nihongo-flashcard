<script>
  import Jp from './Jp.svelte'
  import { page, navigating } from '$app/stores';
  let navStatus  = $state(false)
  let navClass = $derived(
    navStatus ? 'block':'hidden'
  )

  const toggleNav = ()=>{
    // console.log('clicked')
    navStatus = !navStatus
    // console.log('navStatus', navStatus)
  }

  const closeNav = ()=>{
    navStatus = false
  }

  const linkStyle = 'block py-2 px-3 text-md hover:underline text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent'
  const activeStyle = 'block py-2 px-3 text-md hover:underline text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white lg:dark:text-blue-500'
</script>

<nav class="bg-transparent border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <Jp size={50} class="display: inline"/> 
        <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Japanese Flashcard</span>
    </a>
  </div>

</nav>


<script>
  import ChatWindow from '../components/ChatWindow.svelte'
  import ChatInput from '../components/ChatInput.svelte'
  import Modal from '../components/Modal.svelte'

  //import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { loadChat } from '../stores/chatStore.js'
  import { atot } from '../stores/userStore.js'

  let uname = get(atot)
  if (uname) {
    loadChat()
  }

  // onMount(() => {
  //   loadChat()
  // })
</script>

<main>
  {#if uname}
    <ChatWindow />
    <ChatInput />
  {:else}
    <Modal />
  {/if}
</main>

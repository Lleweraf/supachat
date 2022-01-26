<script>
  import ChatWindow from '../components/ChatWindow.svelte'
  import ChatInput from '../components/ChatInput.svelte'
  import Modal from '../components/Modal.svelte'

  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { loadChat, userName } from '../stores/chatStore.js'

  onMount(async () => {
    loadChat()
  })

  let uname = get(userName)
</script>

<main>
  {#if uname}
    <ChatWindow />
    <ChatInput />
  {:else}
    <Modal />
  {/if}
</main>

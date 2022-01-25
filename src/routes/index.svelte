<script>
  import ChatWindow from '../components/ChatWindow.svelte'
  import ChatInput from '../components/ChatInput.svelte'
  import AddUsername from '../components/AddUsername.svelte'
  import Modal from '../components/Modal.svelte'

  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { loadChat, userName } from '../stores/chatStore.js'

  onMount(async () => {
    loadChat()
  })
</script>

<main>
  {#if get(userName)}
    <ChatWindow />
    <ChatInput />
  {/if}

  {#if !get(userName)}
    <Modal>
      <AddUsername />
    </Modal>
  {/if}
</main>

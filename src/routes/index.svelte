<script>
  import ChatWindow from '../components/ChatWindow.svelte'
  import ChatInput from '../components/ChatInput.svelte'
  import AddUsername from '../components/AddUsername.svelte'

  import { onMount } from 'svelte'
  import { loadUserdata, loadChat } from '../stores/chatStore.js'

  let userData = []

  onMount(async () => {
    loadChat()
    userData = await loadUserdata()
  })
</script>

<main>
  {#if userData.tempUser}
    <ChatWindow />
    <ChatInput />
  {:else}
    <AddUsername />
  {/if}
</main>

<script>
  import ChatWindow from '../components/ChatWindow.svelte'
  import ChatInput from '../components/ChatInput.svelte'
  import Modal from '../components/Modal.svelte'

  import { get } from 'svelte/store'
  import { loadChat } from '../stores/chatStore.js'
  import { atot } from '../stores/userStore.js'

  let replyUserData = []

  $: {
    console.log('Index', replyUserData)
  }

  let uname = get(atot)
  if (uname) {
    loadChat()
  }
</script>

<svelte:head>
  <title>Supachat</title>
</svelte:head>

<main>
  {#if uname}
    <ChatWindow {replyUserData} on:reply={(e) => (replyUserData = e.detail.data)} />
    <ChatInput {replyUserData} on:cancelReply={(e) => (replyUserData = e.detail.data)} />
  {:else}
    <Modal />
  {/if}
</main>

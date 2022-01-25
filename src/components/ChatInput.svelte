<script>
  import { sendMessage, loadUserdata } from '../stores/chatStore.js'
  import { onMount } from 'svelte'

  let userData = []
  let message

  onMount(async () => {
    userData = await loadUserdata()
  })

  const handleSubmit = async (username) => {
    const isSent = await sendMessage(username, message)
    if (isSent) {
      message = ''
    }
  }
</script>

<div class="input-container">
  <form on:submit|preventDefault={handleSubmit(userData.tempUser)}>
    <input type="text" placeholder="Say something.." bind:value={message} />
  </form>
</div>

<style lang="scss">
  .input-container {
    background: #fff;
    border-radius: 0 0 5px 5px;
    overflow: hidden;
  }

  .input-container form {
    display: flex;
  }

  input {
    border: none;
    padding: 20px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
</style>

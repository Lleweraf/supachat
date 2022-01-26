<script>
  import { sendMessage, userName } from '../stores/chatStore.js'
  import { get } from 'svelte/store'
  let message
  let uname = get(userName)

  const handleSubmit = async () => {
    let trimmed = message.trim()
    if (trimmed !== '' && trimmed != null) {
      const isSent = await sendMessage(uname, trimmed)
      if (isSent) {
        message = ''
      }
    }
  }
</script>

<div class="input-container">
  <form on:submit|preventDefault={handleSubmit}>
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

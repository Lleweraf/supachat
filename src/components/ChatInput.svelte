<script>
  import { sendMessage } from '../stores/chatStore.js'
  let message
  let username = 'Ralph'

  const handleSubmit = async () => {
    const isSent = await sendMessage(username, message)
    if (isSent) {
      message = ''
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

<script>
  import { setUserdata } from '../stores/chatStore.js'

  let username
  let timeStamp = new Date()

  const handleSubmit = async () => {
    let result = await setUserdata(username, timeStamp)
  }
</script>

<div class="add-username">
  <form on:submit={handleSubmit}>
    <input type="text" placeholder="Enter your username here" bind:value={username} />
  </form>
</div>

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
    <small>You will use this username within <span>24 hrs.</span></small>
  </form>
</div>

<style>
  .add-username span {
    color: #3ecf8e;
    font-weight: 600;
  }
</style>

<script>
  import { setUserdata } from '../stores/chatStore.js'

  let username
  let timeStamp = new Date()

  const handleSubmit = async () => {
    let result = await setUserdata(username, timeStamp)
  }
</script>

<div class="backdrop">
  <div class="modal">
    <div class="add-username">
      <form on:submit={handleSubmit}>
        <input type="text" placeholder="Enter your username here" bind:value={username} />
        <small>You will use this username within <span>24 hrs.</span></small>
      </form>
    </div>
  </div>
</div>

<style lang="scss">
  .backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
  }
  .add-username {
    padding: 20px;
    border-radius: 10px;
    margin: auto;

    input {
      border: none;
      padding: 20px 40px;
      border-radius: 50px;
      text-align: center;
      display: block;
      margin: auto;
      margin-bottom: 10px;

      &:focus {
        outline: none;
      }
    }

    span {
      color: #3ecf8e;
      font-weight: 600;
    }
  }
</style>

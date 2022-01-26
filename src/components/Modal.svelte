<script>
  import { setUserdata } from '../stores/chatStore.js'
  import { checkUser, addUser } from '../stores/userStore.js'

  let isLoading = false
  let hasError = false
  let hasWhiteSpace = false
  let username
  let timeStamp = new Date()

  const handleSubmit = async () => {
    hasWhiteSpace = false
    isLoading = true

    //Sanitize username
    if (username.indexOf(' ') >= 0) {
      hasWhiteSpace = true
      isLoading = false
      return
    }

    let checkUserRes = await checkUser(username)
    if (checkUserRes.length >= 1) {
      hasError = true
      isLoading = false
    } else {
      let addUserRes = await addUser(username)

      if (addUserRes) {
        hasError = false
        isLoading = false
        let result = await setUserdata(username, timeStamp)
        location.reload()
      }
    }
  }
</script>

<div class="backdrop">
  <div class="modal">
    <div class="add-username">
      <form on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="Enter your username here" bind:value={username} />
        {#if isLoading}
          <small>Loading...</small>
        {/if}

        {#if hasError}
          <small>The username already exists. Please try again.</small>
        {/if}

        {#if hasWhiteSpace}
          <small>Invalid username. Must not contain any spaces.</small>
        {/if}

        {#if !hasError && !isLoading && !hasWhiteSpace}
          <small>You will use this username within <span>24 hrs.</span></small>
        {/if}
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

<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte'
  import { loadChat, loadUserdata, chat } from '../stores/chatStore.js'
  import Time from 'svelte-time'

  let userData = []
  let div
  let autoscroll

  onMount(async () => {
    userData = await loadUserdata()
  })

  beforeUpdate(() => {
    autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20
  })

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight)
  })
</script>

<div class="chat-container">
  <div class="chat-window" bind:this={div}>
    <div>
      {#each $chat as { id, created_at, username, message }}
        <div
          class="chat-box"
          class:sender={username === userData.tempUser}
          class:agent={username !== userData.tempUser}
        >
          <!-- if not sender, show profile image -->
          <!-- {#if username !== userData.tempUser}
            <div class="user-profile-image">
              <img src="../src/images/pp.jpg" alt="PP" />
            </div>
          {/if} -->
          <div class="message">
            <div class="message-box" {id}>
              <span>{message}</span>
            </div>
            <div class="info">
              <small>
                <!-- if not sender, show username -->
                {#if username !== userData.tempUser}
                  <span class="username">
                    {username}
                  </span>
                  -
                {/if}
                <span class="time">
                  <Time relative timestamp={created_at} />
                </span>
              </small>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

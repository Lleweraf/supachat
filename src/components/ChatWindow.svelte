<script>
  import { beforeUpdate, afterUpdate } from 'svelte'
  import { chat, userName } from '../stores/chatStore.js'
  import Time from 'svelte-time'
  import { get } from 'svelte/store'

  let div
  let autoscroll
  let uname = get(userName)

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
        <div class="chat-box" class:sender={username === uname} class:agent={username !== uname}>
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
                {#if username !== uname}
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

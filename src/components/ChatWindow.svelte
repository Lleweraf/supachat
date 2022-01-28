<script>
  import { beforeUpdate, afterUpdate } from 'svelte'
  import { chat, loadMore } from '../stores/chatStore.js'
  import { atot } from '../stores/userStore.js'
  import Time from 'svelte-time'
  import { get } from 'svelte/store'
  import { fly } from 'svelte/transition'
  import { quintInOut } from 'svelte/easing'

  let div
  let autoscroll
  let uname = get(atot)

  beforeUpdate(() => {
    autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20
  })

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight)
  })

  const backRead = async (e) => {
    let clientHeight = e.srcElement.scrollTop
    if (clientHeight == 0) {
      loadMore()
    }
  }
</script>

<div class="chat-container">
  <div class="chat-window" bind:this={div} on:scroll={backRead}>
    {#each $chat as { id, created_at, username, message }, key}
      <div class="chat-box" class:sender={username === uname} class:agent={username !== uname}>
        <div class="message">
          {#key key}
            <div class="message-box" {id} transition:fly={{ easing: quintInOut, y: 20, duration: 500, delay: 0.3 }}>
              <span>{message}</span>
            </div>
          {/key}
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

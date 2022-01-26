<script>
  import { beforeUpdate, afterUpdate } from 'svelte'
  import { chat, userName, loadMore } from '../stores/chatStore.js'
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

  const backRead = async (e) => {
    //console.log(e)
    let clientHeight = e.srcElement.clientHeight
    let diff = e.srcElement.scrollHeight + e.srcElement.scrollTop
    if (diff == clientHeight) {
      console.log('Load more data')
      loadMore()
    }
  }
</script>

<div class="chat-container">
  <div class="chat-window" bind:this={div} on:scroll={backRead}>
    {#each $chat as { id, created_at, username, message }}
      <div class="chat-box" class:sender={username === uname} class:agent={username !== uname}>
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

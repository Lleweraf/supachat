<script>
  import { beforeUpdate, afterUpdate } from 'svelte'
  import { chat, loadMore, replyData } from '../stores/chatStore.js'
  import { atot } from '../stores/userStore.js'
  import { createEventDispatcher } from 'svelte'
  import Time from 'svelte-time'
  import { get } from 'svelte/store'
  import Icon from '@krowten/svelte-heroicons/Icon.svelte'

  let isLoading = false
  let div
  let autoscroll
  export let replyUserData = []
  const dispatch = createEventDispatcher()
  let uname = get(atot)

  $: {
    //console.log('Chatwindow', replyUserData)
  }

  beforeUpdate(() => {
    autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20
  })

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight)
  })

  const backRead = async (e) => {
    let clientHeight = e.srcElement.scrollTop
    if (clientHeight == 0) {
      isLoading = true
      setTimeout(() => {
        loadMore()
        isLoading = false
      }, 1500)
    }
  }

  const reply = async (id) => {
    div.scrollTo(0, div.scrollHeight)
    replyUserData = await replyData(id)
    dispatch('reply', {
      data: replyUserData
    })
  }
</script>

<div class="chat-container" class:chat-loading={isLoading}>
  <div class="chat-window" bind:this={div} on:scroll={backRead} class:disable-scroll={isLoading}>
    {#each $chat as { id, created_at, username, message, replied_to_id, replied_to_message, replied_to_username }, key}
      <div class="chat-box" class:sender={username === uname} class:agent={username !== uname}>
        <div class="message">
          {#key key}
            {#if replied_to_id}
              <div class="reply-box">
                <span>Replied to <b>{replied_to_username}</b></span>
                <span>{replied_to_message}</span>
              </div>
            {/if}
            <div class="message-box" {id}>
              <span>{message}</span>
              <p class="reply-btn" on:click={reply(id)}><Icon name="reply" solid /></p>
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

<style>
  .chat-loading {
    position: relative;
  }

  .chat-loading::before {
    position: absolute;
    content: 'loading..';
    background: #0000005c;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: grid;
    place-content: center;
    font-size: 40px;
  }

  .disable-scroll {
    overflow: hidden;
    filter: blur(4px);
  }
</style>

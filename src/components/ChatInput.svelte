<script>
  import { sendMessage } from '../stores/chatStore.js'
  import { atot } from '../stores/userStore.js'
  import { get } from 'svelte/store'
  import { createEventDispatcher } from 'svelte'
  import Spinner from '../components/Spinner.svelte'

  let message
  let uname = get(atot)
  export let replyUserData = []
  const dispatch = createEventDispatcher()
  let replyId
  let theMessage
  let replyUser
  let input
  let isSending = false

  $: {
    //console.log('Chatinput', replyUserData)
    if (replyUserData.length > 0) {
      input.focus()
    }
  }

  const handleSubmit = async () => {
    isSending = true
    let trimmed = await message.trim()
    const isSent = setTimeout(() => {
      if (trimmed !== '' && trimmed != null) {
        if (replyUserData.length !== 0) {
          replyId = replyUserData[0].id
          theMessage = replyUserData[0].message
          replyUser = replyUserData[0].username
        } else {
          replyId = undefined
          theMessage = undefined
          replyUser = undefined
        }

        sendMessage(uname, trimmed, replyId, theMessage, replyUser)

        if (isSent) {
          replyUserData = []
          dispatch('cancelReply', {
            data: replyUserData
          })
          message = ''
          isSending = false
        }
      }
    }, 1000)
  }

  const cancelReply = () => {
    replyUserData = []
    dispatch('cancelReply', {
      data: replyUserData
    })
  }
</script>

<div class="input-container" class:isreply={replyUserData.length !== 0}>
  {#if replyUserData.length !== 0}
    <div class="reply-info">
      <div class="inner">
        {#each replyUserData as data}
          <div class="left">
            <small>Replying to <span class="username">{data.username}</span> </small>
            <small class="reply">"{data.message}"</small>
          </div>
          <div class="right" on:click={cancelReply}>X</div>
        {/each}
      </div>
    </div>
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Say something.." bind:value={message} bind:this={input} disabled={isSending} />
    {#if isSending}
      <Spinner />
    {/if}
  </form>
</div>

<style lang="scss">
  form {
    position: relative;
  }

  .input-container {
    background: #fff;
    border-radius: 0 0 5px 5px;
    overflow: hidden;
  }

  .isreply {
    background: #272727;
    text-align: left;

    .reply-info {
      padding: 10px 20px;

      .inner {
        border-left: 3px solid #3ecf8e;
        padding-left: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          flex-direction: column;

          small {
            margin: 5px 0;
          }

          .username {
            font-weight: bold;
            color: #3ecf8e;
          }

          .reply {
            font-style: italic;
          }
        }

        .right {
          background: #3c3c3c;
          padding: 5px 8px;
          border-radius: 50px;
          line-height: 1.3;
          font-size: 10px;
          cursor: pointer;
        }
      }
    }
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

    &:disabled {
      background: #dedede;
    }
  }

  @media (max-width: 425px) {
    .input-container {
      border-radius: 0;
    }
  }
</style>

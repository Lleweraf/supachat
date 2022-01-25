<script>
  import { beforeUpdate, afterUpdate } from 'svelte'
  import { chat } from '../stores/chatStore.js'
  let div
  let autoscroll

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
      <div class="chat-box agent">
        <div class="user-profile-image">
          <img src="../src/images/pp.jpg" alt="PP" />
        </div>
        <div class="message">
          <div class="message-box">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, eveniet alias sint vel ipsum rerum
              consequatur corporis vitae enim quia eaque eos, necessitatibus, sunt saepe iure cumque sed blanditiis
              voluptatum!
            </p>
          </div>
          <div class="info">
            <small>Russel - <span class="time">9:10</span></small>
          </div>

          <div class="message-box">
            <p>atot</p>
          </div>
          <div class="info">
            <small>Russel - <span class="time">9:10</span></small>
          </div>
        </div>
      </div>

      <div class="chat-box sender">
        <!-- if sender, hide profile image -->
        <div class="message">
          {#each $chat as { id, created_at, username, message }}
            <div class="message-box" {id}>
              <span>{message}</span>
            </div>
            <div class="info">
              <!-- if sender, show only date stamp -->
              <small><span class="time">{created_at}</span></small>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

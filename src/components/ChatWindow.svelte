<script>
  import { chat } from '../stores/chatStore.js'
</script>

<div class="chat-container">
  <div class="chat-window">
    <div>
      <!-- <div class="chat-box agent">
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
        </div>
      </div> -->

      <div class="chat-box sender">
        <div class="user-profile-image">
          <img src="../src/images/pp.jpg" alt="PP" />
        </div>
        <div class="message">
          {#each $chat as { message, id }}
            <div class="message-box {id}">
              <p>{message}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

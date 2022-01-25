<script>
  import '../app.scss'
  import '../reset.css'
  import { onMount } from 'svelte'
  import { loadChat } from '../stores/chatStore.js'
  import { loadUserdata } from '../stores/chatStore.js'
  let userData = []

  onMount(async () => {
    userData = await loadUserdata()
  })
</script>

{#if userData.tempUser}
  <header>
    <div class="logo">
      <h1>supachat</h1>
    </div>

    <div class="user-info">
      Hello, <span>{userData.tempUser}</span>
    </div>
  </header>
{/if}

<slot />

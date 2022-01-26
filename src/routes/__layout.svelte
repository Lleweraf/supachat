<script>
  import '../app.scss'
  import '../reset.css'
  import { userName } from '../stores/chatStore.js'
  import { get } from 'svelte/store'

  let uname = get(userName)
</script>

{#if uname}
  <header>
    <div class="logo">
      <h1>supachat</h1>
    </div>

    <div class="user-info">
      Hello, <span>{uname}</span>
    </div>
  </header>
{/if}

<slot />

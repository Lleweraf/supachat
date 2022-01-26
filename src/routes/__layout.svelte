<script>
  import '../app.scss'
  import '../reset.css'
  import { atot } from '../stores/userStore.js'
  import { get } from 'svelte/store'

  let uname = get(atot)
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

{#if uname}
  <footer>
    <p>Source code</p>
  </footer>
{/if}

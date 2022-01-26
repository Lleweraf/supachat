<script>
  import '../app.scss'
  import '../reset.css'
  import { atot } from '../stores/userStore.js'
  import { get } from 'svelte/store'
  import Icon from '@krowten/svelte-heroicons/Icon.svelte'

  let uname = get(atot)
</script>

{#if uname}
  <header>
    <div class="inner">
      <div class="logo">
        <h1>supa</h1>
        <Icon name="lightning-bolt" />
        <h1>chat</h1>
      </div>

      <div class="user-info">
        <p>Hello, <span>{uname}</span></p>
        <Icon name="user-circle" />
      </div>
    </div>
  </header>
{/if}

<slot />

{#if uname}
  <footer>
    <div class="source-code">
      <Icon name="code" />
      <small>view source code on <a href="https://github.com/Lleweraf/supachat" target="_blank">Github</a></small>
    </div>
  </footer>
{/if}

<script>
  import '../app.scss'
  import '../reset.css'
  import { onMount } from 'svelte'
  import { loadChat } from '../stores/chatStore.js'

  onMount(async () => {
    loadChat()
  })
</script>

<slot />

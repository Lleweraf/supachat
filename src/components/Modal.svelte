<script>
</script>

<div class="backdrop">
  <div class="modal">
    <slot />
  </div>
</div>

<style>
  .backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
  }
</style>

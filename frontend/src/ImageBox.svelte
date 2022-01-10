<script lang="ts">
  import RandomImage from "./RandomImage.svelte";
  import store from "./store";

  export let slot: "image-1" | "image-2";

  $: selected = $store.selected == slot;
  const onClick = () => {
    $store.selected = slot;
  };

</script>

<div id="wrapper">
  <RandomImage onClick={onClick} slot={slot} />
  {#if selected}
    <p>Why?</p>
    <div class="reasons">
      {#each Object.keys($store.selectedReasons) as reason}
        <button on:click={() => $store.selectedReasons[reason] = !$store.selectedReasons[reason]} 
            class={`button is-${$store.selectedReasons[reason] ? 'success' : 'light'}`} id="skip">{reason}</button>
      {/each}
      <input type="text" placeholder="Other" on:keyup={e => {
        $store.additionalReasons = e.target.toLowerCase().trim()
      }}>
    </div>
  {/if}
</div>

<style>
  #wrapper {
    margin: 50px auto 50px auto;
    position: relative;
  }

  p {
    margin-top: 20px;
  }

  .reasons {
    margin: 20px auto 0 auto;
    /* width: 100%; */
    /* width: 500px; */
    max-width: 300px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  input {
      /* max-width: 200px; */
      width: 100%;
  }
</style>

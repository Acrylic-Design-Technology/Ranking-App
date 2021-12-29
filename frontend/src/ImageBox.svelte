<script lang="ts">
  import RandomImage from "./RandomImage.svelte";
import store from "./store";

  export let slot: "image-1" | "image-2";

  $: selected = $store.selected == slot;
  const onClick = () => {
    $store.selected = slot;
    // $store.selectedReason = null; // clear previous reason
  };
  const reasons = [
      "Detail",
      "Stroke techniques",
      "Many layers"
    ];
</script>

<div id="wrapper">
  <RandomImage onClick={onClick} slot={slot} />
  {#if selected}
    <p>Optional: Why?</p>
    <div class="reasons">
      {#each reasons as reason}
        <button on:click={() => $store.selectedReason=reason} class={`button is-${$store.selectedReason === reason ? 'success' : 'light'}`} id="skip">{reason}</button>
      {/each}
      <input type="text" placeholder="Other" on:keyup={e => $store.selectedReason=e.target.value}>
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
    margin-top: 20px;
    /* width: 100%; */
    width: 500px;
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

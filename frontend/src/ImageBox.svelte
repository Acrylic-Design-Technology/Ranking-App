<script lang="ts">
  import RandomImage from "./RandomImage.svelte";
  import store from "./store";
  import NewTag from "./NewTag.svelte";

  export let slot: "image-1" | "image-2";

  const onNewTag = name => {
    $store.selectedReasons[name] = true;
  }

  $: selected = $store.selected == slot;
  const onClick = () => {
    $store.selected = slot;
  };
</script>

<div id="wrapper">
  <RandomImage {onClick} {slot} />
  {#if selected}
    <p class="is-size-4">Why?</p>
    <div class="reasons">
      {#each Object.keys($store.selectedReasons) as reason}
        <button 
          on:click={() =>
            ($store.selectedReasons[reason] = !$store.selectedReasons[reason])}
          class={`button is-${
            $store.selectedReasons[reason] ? "success" : "light"
          }`}><span>{$store.selectedReasons[reason] ? "x" : "+"}</span><span>{reason}</span></button
        >
      {/each}
      <NewTag onSubmit={onNewTag}/>
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
    max-width: 200px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  button {
    display: flex;
    flex-direction: row;
  }
  span:nth-child(2) {
    width: 80%;
  }
</style>
